import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Download, ChevronRight, Check } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Job {
  'Job Title': string;
  Company: string;
  Location: string;
  Salary?: string;
  Skills: string[];
  MatchPercentage?: number;
  JobUrl?: string;
}

const commonJobTitles = [
  // Technical Roles
  "Software Engineer",
  "Data Scientist",
  "DevOps Engineer",
  "UX Designer",
  
  // Business & Management
  "Product Manager",
  "Business Analyst",
  "Project Manager",
  "Marketing Manager",
  
  // Finance & Accounting
  "Financial Analyst",
  "Accountant",
  
  // HR & Operations
  "HR Manager",
  "Operations Manager",
  
  // Sales
  "Sales Manager",
  "Account Executive"
];

export default function JobAnalytics() {
  const [userSkills, setUserSkills] = useState('');
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);

  const handleSkillsSubmit = async () => {
    if (!userSkills.trim()) return;
    setIsLoading(true);
    try {
      // Simulate API call to get job titles based on skills
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(2);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobTitleSelect = async (title: string) => {
    setSelectedJobTitle(title);
    setIsLoading(true);
    try {
      const skills = userSkills.split(',').map(skill => skill.trim());
      console.log('Sending request with:', { skills, job_title: title });
      
      const response = await fetch('http://localhost:8000/recommend-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills: skills,
          job_title: title
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received response:', data);
      
      if (data.success && Array.isArray(data.data)) {
        setRecommendedJobs(data.data);
        setStep(3);
      } else {
        console.error('API returned invalid data:', data);
      }
    } catch (error) {
      console.error('Error getting job recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobSelect = async (job: Job) => {
    setSelectedJob(job);
    setIsLoading(true);
    try {
      // Simulate getting similar jobs
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSimilarJobs(recommendedJobs.filter(j => j !== job).slice(0, 3));
      setStep(4);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = (data: Job[], filename: string) => {
    const headers = ['Job Title', 'Company', 'Location', 'Salary', 'Skills'];
    const csvContent = [
      headers.join(','),
      ...data.map(job => [
        `"${job['Job Title']}"`,
        `"${job.Company}"`,
        `"${job.Location}"`,
        `"${job.Salary || ''}"`,
        `"${job.Skills.join(', ')}"`,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCSV = () => {
    downloadCSV([selectedJob, ...similarJobs], 'recommended_jobs.csv');
  };

  return (
    <div className="space-y-8">
      {/* Step 1: Skills Input */}
      <Card className={step === 1 ? 'border-blue-500' : ''}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant={step === 1 ? 'default' : 'secondary'}>Step 1</Badge>
            Enter Your Skills
          </CardTitle>
          <CardDescription>List your technical and professional skills to find matching jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your skills (e.g., python, react, typescript, aws)..."
              value={userSkills}
              onChange={(e) => setUserSkills(e.target.value)}
              disabled={step !== 1}
            />
            {step === 1 && (
              <Button
                onClick={handleSkillsSubmit}
                disabled={isLoading || !userSkills.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Job Title Selection */}
      {step >= 2 && (
        <Card className={step === 2 ? 'border-blue-500' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant={step === 2 ? 'default' : 'secondary'}>Step 2</Badge>
              Select Job Title
            </CardTitle>
            <CardDescription>Choose the job title that best matches your career goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {commonJobTitles.map((title) => (
                <Button
                  key={title}
                  variant={selectedJobTitle === title ? 'default' : 'outline'}
                  onClick={() => handleJobTitleSelect(title)}
                  disabled={step !== 2 || isLoading}
                  className="justify-start"
                >
                  {selectedJobTitle === title && <Check className="mr-2 h-4 w-4" />}
                  {title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Job Recommendations */}
      {step >= 3 && (
        <Card className={step === 3 ? 'border-blue-500' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant={step === 3 ? 'default' : 'secondary'}>Step 3</Badge>
              Choose Your Preferred Job
            </CardTitle>
            <CardDescription>Select the job that interests you the most</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedJobs.length > 0 ? (
                recommendedJobs.map((job, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all hover:border-blue-500 ${
                      selectedJob === job ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleJobSelect(job)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{job['Job Title']}</h3>
                          <p className="text-sm text-gray-600">{job.Company}</p>
                          <p className="text-sm text-gray-600">{job.Location}</p>
                          <p className="text-sm font-medium text-green-600">{job.Salary}</p>
                        </div>
                        <Badge variant={job.MatchPercentage && job.MatchPercentage > 80 ? "success" : "default"}>
                          {job.MatchPercentage}% Match
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Required Skills:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {job.Skills.map((skill, i) => (
                            <Badge key={i} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No job recommendations found. Try different skills or job title.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Similar Jobs */}
      {step >= 4 && selectedJob && (
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">Final Recommendations</Badge>
            </CardTitle>
            <CardDescription>Based on your selected job, here are similar opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{selectedJob['Job Title']}</h3>
                      <p className="text-lg text-gray-600">{selectedJob.Company}</p>
                      <p className="text-gray-600">{selectedJob.Location}</p>
                      <p className="text-lg font-medium text-green-600 mt-2">{selectedJob.Salary}</p>
                      {selectedJob.JobUrl && (
                        <a
                          href={selectedJob.JobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Apply Now
                        </a>
                      )}
                    </div>
                    <Badge variant={selectedJob.MatchPercentage && selectedJob.MatchPercentage > 80 ? "success" : "default"}>
                      {selectedJob.MatchPercentage}% Match
                    </Badge>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.Skills.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Button onClick={handleDownloadCSV} className="w-full">
                  Download Job Details as CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
