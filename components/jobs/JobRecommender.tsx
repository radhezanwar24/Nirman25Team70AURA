import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from 'lucide-react';

interface Job {
    title: string;
    company: string;
    location: string;
    skills: string[];
    description: string;
    job_type: string;
    url: string;
    posted_at: string;
    salary: string;
}

export default function JobRecommender() {
    const [skills, setSkills] = useState<string>('');
    const [recommendations, setRecommendations] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const skillsArray = skills
                .split(',')
                .map(skill => skill.trim())
                .filter(skill => skill.length > 0);

            const response = await fetch('/api/jobs/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ skills: skillsArray }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get recommendations');
            }

            setRecommendations(data.recommendations);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Job Recommendations</CardTitle>
                    <CardDescription>
                        Enter your skills (separated by commas) to get personalized job recommendations
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="e.g. Python, React, JavaScript"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                disabled={loading}
                            />
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Finding Jobs...' : 'Find Jobs'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {error && (
                <div className="text-red-500 text-center p-4">
                    {error}
                </div>
            )}

            {recommendations.length > 0 && (
                <div className="space-y-4">
                    {recommendations.map((job, index) => (
                        <Card key={index} className="overflow-hidden">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl">{job.title}</CardTitle>
                                        <CardDescription className="text-base">
                                            {job.company} • {job.location}
                                        </CardDescription>
                                    </div>
                                    {job.url && (
                                        <a 
                                            href={job.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills.map((skill, skillIndex) => (
                                            <Badge key={skillIndex} variant="secondary">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="text-sm space-y-2">
                                        <p><strong>Job Type:</strong> {job.job_type}</p>
                                        {job.salary !== 'Not specified' && (
                                            <p><strong>Salary:</strong> {job.salary}</p>
                                        )}
                                        <p><strong>Posted:</strong> {formatDate(job.posted_at)}</p>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-4">
                                        {job.description}
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-gray-50">
                                <div className="w-full flex justify-between items-center">
                                    <div className="text-sm text-gray-500">
                                        {job.job_type} • {job.location}
                                    </div>
                                    {job.url && (
                                        <Button 
                                            variant="outline"
                                            onClick={() => window.open(job.url, '_blank')}
                                        >
                                            Apply Now
                                        </Button>
                                    )}
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
