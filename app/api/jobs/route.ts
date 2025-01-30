import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';

async function getLinkedInAccessToken() {
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('LinkedIn credentials not configured');
    }

    try {
        const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to get LinkedIn access token');
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error getting LinkedIn access token:', error);
        throw error;
    }
}

export async function POST(req: Request) {
    try {
        const { searchQuery } = await req.json();
        
        try {
            // Launch browser
            const browser = await chromium.launch({ headless: true });
            const context = await browser.newContext({
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            });
            const page = await context.newPage();

            // Go to LinkedIn jobs search
            const encodedQuery = encodeURIComponent(searchQuery);
            await page.goto(`https://www.linkedin.com/jobs/search?keywords=${encodedQuery}&location=&geoId=&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`, {
                waitUntil: 'networkidle'
            });

            // Wait for job cards to load
            await page.waitForSelector('.jobs-search__results-list');

            // Scroll to load more jobs
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
            await page.waitForTimeout(2000);

            // Scrape job data
            const jobsData = await page.evaluate(() => {
                const jobs = [];
                const jobCards = document.querySelectorAll('.jobs-search__results-list > li');

                jobCards.forEach(card => {
                    const titleElement = card.querySelector('.base-search-card__title');
                    const companyElement = card.querySelector('.base-search-card__subtitle');
                    const locationElement = card.querySelector('.job-search-card__location');
                    const linkElement = card.querySelector('a.base-card__full-link');
                    const dateElement = card.querySelector('time.job-search-card__listdate');
                    
                    if (titleElement && companyElement) {
                        jobs.push({
                            title: titleElement.textContent?.trim() || '',
                            company: companyElement.textContent?.trim() || '',
                            location: locationElement?.textContent?.trim() || 'Remote',
                            link: linkElement?.getAttribute('href') || '',
                            datePosted: dateElement?.getAttribute('datetime') || new Date().toISOString()
                        });
                    }
                });

                return jobs;
            });

            await browser.close();

            if (jobsData.length === 0) {
                return NextResponse.json({
                    success: false,
                    error: 'No jobs found',
                    data: []
                });
            }

            // Generate CSV content with more details
            const csvHeader = "Job Title,Company,Location,Date Posted,Job Link\n";
            const csvRows = jobsData.map(job => 
                `"${job.title.replace(/"/g, '""')}","${job.company.replace(/"/g, '""')}","${job.location.replace(/"/g, '""')}","${job.datePosted}","${job.link}"`
            ).join('\n');
            const csvContent = csvHeader + csvRows;

            // Save CSV file with timestamp and search query
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const sanitizedQuery = searchQuery.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
            const fileName = `linkedin_jobs_${sanitizedQuery}_${timestamp}.csv`;
            const filePath = path.join(process.cwd(), 'public', 'downloads', fileName);
            
            try {
                await writeFile(filePath, csvContent, 'utf-8');
                console.log('CSV file saved successfully:', filePath);
            } catch (error) {
                console.error('Error saving CSV file:', error);
                throw error;
            }

            return NextResponse.json({
                success: true,
                data: jobsData,
                downloadUrl: `/downloads/${fileName}`,
                totalJobs: jobsData.length
            });

        } catch (error) {
            console.error('LinkedIn scraping error:', error);
            
            // Fallback to LinkedIn API if scraping fails
            try {
                // Get LinkedIn access token
                const accessToken = await getLinkedInAccessToken();
                
                // Search LinkedIn jobs
                const searchResponse = await fetch(
                    `https://api.linkedin.com/v2/jobSearch?keywords=${encodeURIComponent(searchQuery)}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!searchResponse.ok) {
                    throw new Error('LinkedIn API request failed');
                }

                const jobsData = await searchResponse.json();
                
                // Transform LinkedIn API response to our format
                const formattedJobs = jobsData.elements.map((job: any) => ({
                    title: job.title,
                    company: job.companyDetails?.companyName || 'Unknown Company',
                    location: job.formattedLocation || 'Remote',
                    description: job.description,
                    applyUrl: job.applyUrl,
                }));

                // Generate CSV content
                const csvHeader = "Job Title,Company,Location,Apply URL\n";
                const csvRows = formattedJobs.map(job => 
                    `"${job.title.replace(/"/g, '""')}","${job.company.replace(/"/g, '""')}","${job.location.replace(/"/g, '""')}","${job.applyUrl}"`
                ).join('\n');
                const csvContent = csvHeader + csvRows;

                // Save CSV file
                const fileName = `jobs_${Date.now()}.csv`;
                const filePath = path.join(process.cwd(), 'public', 'downloads', fileName);
                
                try {
                    await writeFile(filePath, csvContent, 'utf-8');
                    console.log('CSV file saved successfully:', filePath);
                } catch (error) {
                    console.error('Error saving CSV file:', error);
                    throw error;
                }

                return NextResponse.json({
                    success: true,
                    data: formattedJobs,
                    downloadUrl: `/downloads/${fileName}`,
                    totalJobs: formattedJobs.length
                });

            } catch (error) {
                console.error('LinkedIn API error:', error);
                
                // Return empty data with error
                return NextResponse.json({
                    success: false,
                    error: 'Failed to fetch LinkedIn jobs',
                    data: []
                }, { status: 500 });
            }
        }

    } catch (error) {
        console.error('Error in jobs API:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
