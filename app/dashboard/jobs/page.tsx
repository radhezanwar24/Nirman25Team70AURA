"use client";

import { JobSearch } from "@/components/job-search/JobSearch";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobsPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Check if auth token exists
        const hasAuthToken = document.cookie.includes('auth-token');
        setIsAuthenticated(hasAuthToken);
    }, []);

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Job Recommendations</h1>
                {!isAuthenticated && (
                    <Button
                        onClick={() => router.push('/login')}
                        variant="outline"
                    >
                        Sign in for personalized recommendations
                    </Button>
                )}
            </div>
            <JobSearch />
        </div>
    );
}
