import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, ExternalLink } from "lucide-react";

interface Job {
    title: string;
    company: string;
    location: string;
    description?: string;
    applyUrl?: string;
}

export function JobSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState('');

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchQuery }),
            });

            const data = await response.json();
            
            if (data.success) {
                setJobs(data.data);
                setDownloadUrl(data.downloadUrl);
            } else {
                console.error('Failed to fetch jobs');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <div className="flex gap-4">
                <Input
                    type="text"
                    placeholder="Enter job title or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                    onClick={handleSearch}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Searching...
                        </>
                    ) : (
                        'Search Jobs'
                    )}
                </Button>
            </div>

            {downloadUrl && jobs.length > 0 && (
                <div className="text-center">
                    <Button
                        variant="outline"
                        onClick={() => window.open(downloadUrl, '_blank')}
                    >
                        Download Results (CSV)
                    </Button>
                </div>
            )}

            <div className="grid gap-4">
                {jobs.map((job, index) => (
                    <Card key={index} className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg">{job.title}</h3>
                                <p className="text-sm text-gray-600">{job.company}</p>
                                <p className="text-sm text-gray-500">{job.location}</p>
                                {job.description && (
                                    <p className="mt-2 text-sm text-gray-700">{job.description}</p>
                                )}
                            </div>
                            {job.applyUrl && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(job.applyUrl, '_blank')}
                                    className="flex items-center gap-2"
                                >
                                    Apply <ExternalLink className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
