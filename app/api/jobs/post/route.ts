import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

// Simple in-memory store for posted jobs (in production, use a database)
let postedJobs: any[] = [];

export async function POST(req: Request) {
    try {
        const jobData = await req.json();
        
        // Add timestamp and generate ID
        const newJob = {
            ...jobData,
            id: Date.now().toString(),
            postedAt: new Date().toISOString(),
            postedBy: 'User' // In production, get this from the authenticated user
        };

        // Add to our in-memory store
        postedJobs.push(newJob);

        // In production, you would save this to a database
        // For now, we'll save it to a JSON file
        const jobsFilePath = path.join(process.cwd(), 'public', 'data', 'posted-jobs.json');
        try {
            // Read existing jobs
            const existingData = await readFile(jobsFilePath, 'utf8');
            const existingJobs = JSON.parse(existingData);
            existingJobs.push(newJob);
            await writeFile(jobsFilePath, JSON.stringify(existingJobs, null, 2));
        } catch (error) {
            // If file doesn't exist, create it with the first job
            await writeFile(jobsFilePath, JSON.stringify([newJob], null, 2));
        }

        return NextResponse.json({
            success: true,
            job: newJob
        });

    } catch (error) {
        console.error('Error posting job:', error);
        return NextResponse.json(
            { error: 'Failed to post job' },
            { status: 500 }
        );
    }
}
