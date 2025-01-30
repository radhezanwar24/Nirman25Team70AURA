import requests
import json
from typing import List, Dict
from datetime import datetime
import sys
import traceback
import os

# Add the current directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from config import RAPID_API_KEY

class JobRecommender:
    def __init__(self):
        self.jobs_data = []
        self.api_key = RAPID_API_KEY
        self.base_url = 'https://jsearch.p.rapidapi.com'

    def extract_skills(self, text: str) -> List[str]:
        # Common tech skills for matching
        common_skills = ['python', 'javascript', 'java', 'c++', 'react', 'node', 'sql', 
                        'html', 'css', 'aws', 'docker', 'kubernetes', 'git', 'agile',
                        'machine learning', 'ai', 'data science', 'web development']
        
        text = text.lower()
        found_skills = []
        for skill in common_skills:
            if skill in text:
                found_skills.append(skill)
        return list(set(found_skills))

    def fetch_jobs(self, query: str = "software developer", num_pages: int = 1) -> List[Dict]:
        try:
            print(f"Fetching jobs with query: {query}", file=sys.stderr)
            print(f"Using API Key: {self.api_key[:10]}...", file=sys.stderr)
            
            headers = {
                'X-RapidAPI-Key': self.api_key,
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }

            all_jobs = []
            for page in range(1, num_pages + 1):
                params = {
                    'query': query,
                    'page': str(page),
                    'num_pages': '1',
                    'date_posted': 'month'
                }

                print(f"Making API request to {self.base_url}/search", file=sys.stderr)
                response = requests.get(
                    f"{self.base_url}/search",
                    headers=headers,
                    params=params
                )
                
                print(f"API Response Status: {response.status_code}", file=sys.stderr)
                if response.status_code == 200:
                    data = response.json()
                    jobs = data.get('data', [])
                    print(f"Found {len(jobs)} jobs", file=sys.stderr)
                    
                    for job in jobs:
                        # Extract relevant information and skills
                        job_info = {
                            "title": job.get('job_title', 'N/A'),
                            "company": job.get('employer_name', 'N/A'),
                            "location": f"{job.get('job_city', '')}, {job.get('job_country', '')}",
                            "description": job.get('job_description', ''),
                            "job_type": job.get('job_employment_type', 'N/A'),
                            "url": job.get('job_apply_link', ''),
                            "posted_at": job.get('job_posted_at_datetime_utc', ''),
                            "salary": job.get('job_max_salary', 'Not specified')
                        }
                        
                        # Extract skills from job title and description
                        job_info["skills"] = self.extract_skills(
                            job_info["title"] + " " + job_info["description"]
                        )
                        
                        all_jobs.append(job_info)
                else:
                    print(f"API Error Response: {response.text}", file=sys.stderr)
                        
            return all_jobs
        except Exception as e:
            print(f"Error fetching jobs: {str(e)}", file=sys.stderr)
            print(f"Traceback: {traceback.format_exc()}", file=sys.stderr)
            return []

    def update_jobs_data(self, query: str = None):
        if query:
            self.jobs_data = self.fetch_jobs(query)
            return len(self.jobs_data) > 0
        return False

    def recommend_jobs(self, user_skills: List[str], top_n: int = 5) -> List[Dict]:
        if not self.jobs_data:
            return []

        # Convert user skills to lowercase for matching
        user_skills = [skill.lower().strip() for skill in user_skills]
        
        # Score each job based on skill matches
        scored_jobs = []
        for job in self.jobs_data:
            matching_skills = set(job['skills']).intersection(set(user_skills))
            score = len(matching_skills)
            scored_jobs.append((score, job))
        
        # Sort by score and get top N jobs
        scored_jobs.sort(key=lambda x: x[0], reverse=True)
        recommended_jobs = [job for score, job in scored_jobs[:top_n]]
        
        return recommended_jobs

if __name__ == "__main__":
    try:
        # Get skills from command line argument
        if len(sys.argv) > 1:
            print("Starting job recommendation process...", file=sys.stderr)
            
            # Read the raw input and properly decode it
            raw_input = sys.argv[1].strip('"\'')  # Remove any quotes
            try:
                skills = json.loads(raw_input)
            except json.JSONDecodeError:
                # If JSON parsing fails, try splitting by comma
                skills = [s.strip() for s in raw_input.split(',')]
            
            print(f"Received skills: {skills}", file=sys.stderr)
            
            recommender = JobRecommender()
            
            # Use skills as search query
            query = " ".join(skills)
            print(f"Using query: {query}", file=sys.stderr)
            
            recommender.update_jobs_data(query)
            
            recommendations = recommender.recommend_jobs(skills)
            print(f"Found {len(recommendations)} recommendations", file=sys.stderr)
            
            # Print the recommendations as JSON to stdout
            print(json.dumps(recommendations))
    except Exception as e:
        print(f"Main error: {str(e)}", file=sys.stderr)
        print(f"Traceback: {traceback.format_exc()}", file=sys.stderr)
        sys.exit(1)
