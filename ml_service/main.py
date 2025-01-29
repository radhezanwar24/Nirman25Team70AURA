from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import random
import requests
import json
from datetime import datetime
import time
import os
from config import RAPID_API_KEY

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SkillsInput(BaseModel):
    skills: List[str]
    job_title: str

def get_jobs_from_api(job_title: str, location: str = "remote") -> List[dict]:
    """
    Get jobs using the JSearch API from RapidAPI
    """
    try:
        url = "https://jsearch.p.rapidapi.com/search"
        
        querystring = {
            "query": f"{job_title} in {location}",
            "page": "1",
            "num_pages": "1"
        }
        
        headers = {
            "X-RapidAPI-Key": RAPID_API_KEY,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
        }
        
        print(f"Fetching jobs for: {job_title} in {location}")
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()
        
        data = response.json()
        if not data.get("data"):
            print("No jobs found in API response")
            return []
            
        jobs = []
        for job in data["data"][:8]:  # Get first 8 jobs
            try:
                # Extract and format job details
                job_data = {
                    "Job Title": job.get("job_title", ""),
                    "Company": job.get("employer_name", ""),
                    "Location": job.get("job_city", "") + ", " + job.get("job_country", ""),
                    "Salary": job.get("job_min_salary", "Not specified"),
                    "JobUrl": job.get("job_apply_link", ""),
                    "Description": job.get("job_description", ""),
                    "JobType": job.get("job_employment_type", "Full-time"),
                    "PostedDate": job.get("job_posted_at_datetime_utc", "Recently Posted"),
                    "RequiredSkills": job.get("job_required_skills", [])
                }
                jobs.append(job_data)
                print(f"Found job: {job_data['Job Title']} at {job_data['Company']}")
            except Exception as e:
                print(f"Error processing job data: {str(e)}")
                continue
                
        return jobs
        
    except Exception as e:
        print(f"Error fetching jobs from API: {str(e)}")
        return []

def extract_skills_from_description(description: str, required_skills: List[str]) -> List[str]:
    """
    Extract skills from job description and combine with required skills
    """
    # Common skills to look for
    common_skills = [
        "Python", "JavaScript", "Java", "C++", "React", "Angular", "Vue",
        "Node.js", "SQL", "MongoDB", "AWS", "Azure", "Docker", "Kubernetes",
        "Git", "REST", "API", "HTML", "CSS", "TypeScript", "Linux", "Agile",
        "Scrum", "DevOps", "CI/CD", "Machine Learning", "AI", "Data Science",
        "Excel", "PowerPoint", "Word", "Project Management", "Communication",
        "Leadership", "Analytics", "Marketing", "Sales", "Finance", "Accounting",
        "HR", "Operations", "Strategy", "Research", "Design", "UX", "UI"
    ]
    
    # Start with required skills from the API
    skills = set(required_skills)
    
    # Add skills found in description
    description_lower = description.lower()
    for skill in common_skills:
        if skill.lower() in description_lower:
            skills.add(skill)
    
    return list(skills)

@app.post("/recommend-jobs")
async def recommend_jobs(skills_input: SkillsInput):
    try:
        user_skills = [skill.lower().strip() for skill in skills_input.skills]
        job_title = skills_input.job_title
        
        # Get jobs from API
        jobs = get_jobs_from_api(job_title)
        
        if not jobs:
            print("No jobs found from API, falling back to sample data")
            return {
                "success": True,
                "data": generate_sample_jobs(job_title, user_skills),
                "message": "Using sample job recommendations"
            }
        
        # Process jobs and calculate matches
        processed_jobs = []
        for job in jobs:
            # Extract skills from description and combine with required skills
            job_skills = extract_skills_from_description(
                job["Description"],
                job.get("RequiredSkills", [])
            )
            
            # Calculate match percentage
            user_skill_set = set(skill.lower() for skill in user_skills)
            job_skill_set = set(skill.lower() for skill in job_skills)
            if user_skill_set:
                match_percentage = len(user_skill_set.intersection(job_skill_set)) / len(user_skill_set) * 100
            else:
                match_percentage = 0
            
            processed_job = {
                "Job Title": job["Job Title"],
                "Company": job["Company"],
                "Location": job["Location"],
                "Salary": job["Salary"],
                "Skills": job_skills,
                "MatchPercentage": round(match_percentage),
                "JobUrl": job["JobUrl"],
                "JobType": job.get("JobType", ""),
                "PostedDate": job.get("PostedDate", "")
            }
            processed_jobs.append(processed_job)
        
        # Sort by match percentage
        processed_jobs.sort(key=lambda x: x["MatchPercentage"], reverse=True)
        
        return {
            "success": True,
            "data": processed_jobs,
            "message": "Jobs found successfully"
        }
        
    except Exception as e:
        print(f"Error in recommend_jobs: {str(e)}")
        return {
            "success": True,
            "data": generate_sample_jobs(job_title, user_skills),
            "message": "Error fetching jobs, showing sample recommendations"
        }

def generate_sample_jobs(job_title: str, user_skills: List[str]):
    # Get relevant skills for the job title
    TECH_SKILLS = {
        # Technical Roles
        "Software Engineer": [
            "Python", "JavaScript", "TypeScript", "React", "Node.js",
            "AWS", "Docker", "Kubernetes", "SQL", "MongoDB",
            "Git", "CI/CD", "REST APIs", "Java", "Go"
        ],
        "Data Scientist": [
            "Python", "R", "SQL", "Machine Learning", "Deep Learning",
            "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn",
            "Data Visualization", "Statistics", "Big Data", "Spark"
        ],
        "DevOps Engineer": [
            "AWS", "Docker", "Kubernetes", "Jenkins", "Terraform",
            "Linux", "Shell Scripting", "Python", "Ansible", "Git",
            "CI/CD", "Monitoring", "Cloud Architecture"
        ],
        "UX Designer": [
            "Figma", "Adobe XD", "Sketch", "User Research", "Prototyping",
            "Wireframing", "UI Design", "User Testing", "Design Systems",
            "Information Architecture", "Visual Design"
        ],
        
        # Business & Management Roles
        "Product Manager": [
            "Product Strategy", "Agile", "Scrum", "User Research",
            "Data Analysis", "Product Analytics", "SQL", "Wireframing",
            "Roadmapping", "Stakeholder Management", "A/B Testing"
        ],
        "Business Analyst": [
            "SQL", "Data Analysis", "Requirements Gathering", "Process Mapping",
            "Business Process", "Microsoft Excel", "Power BI", "Tableau",
            "JIRA", "Documentation", "Stakeholder Management"
        ],
        "Project Manager": [
            "Project Planning", "Agile", "Scrum", "Risk Management",
            "Budgeting", "Microsoft Project", "Stakeholder Management",
            "Team Leadership", "Communication", "Problem Solving"
        ],
        "Marketing Manager": [
            "Digital Marketing", "Social Media", "Content Strategy", "SEO",
            "Google Analytics", "Email Marketing", "Marketing Analytics",
            "Campaign Management", "Brand Management", "Marketing Automation"
        ],
        
        # Finance & Accounting Roles
        "Financial Analyst": [
            "Financial Modeling", "Excel", "SQL", "Power BI", "Bloomberg Terminal",
            "Financial Analysis", "Forecasting", "Budgeting", "Accounting",
            "Risk Analysis", "Financial Reporting"
        ],
        "Accountant": [
            "QuickBooks", "Excel", "Financial Reporting", "Tax Preparation",
            "GAAP", "Reconciliation", "Accounts Payable", "Accounts Receivable",
            "Month-end Close", "Audit"
        ],
        
        # HR & Operations Roles
        "HR Manager": [
            "Recruitment", "Employee Relations", "Performance Management",
            "Benefits Administration", "HR Policies", "Training & Development",
            "HRIS", "Labor Laws", "Compensation", "Employee Engagement"
        ],
        "Operations Manager": [
            "Process Improvement", "Team Management", "Supply Chain",
            "Quality Management", "Inventory Management", "Six Sigma",
            "KPI Tracking", "Vendor Management", "Cost Reduction"
        ],
        
        # Sales Roles
        "Sales Manager": [
            "Sales Strategy", "CRM", "Lead Generation", "Sales Analytics",
            "Team Management", "Customer Relationship", "Negotiation",
            "Pipeline Management", "Revenue Growth", "Sales Forecasting"
        ],
        "Account Executive": [
            "Sales", "CRM", "Client Relations", "Negotiation",
            "Pipeline Management", "Solution Selling", "Prospecting",
            "Business Development", "Contract Negotiation"
        ]
    }
    
    # Get relevant skills for the job title
    base_skills = TECH_SKILLS.get(job_title, TECH_SKILLS["Software Engineer"])
    
    # Generate sample jobs
    sample_jobs = []
    for i in range(8):  # Generate 8 sample jobs
        company = random.choice([
            "Google", "Microsoft", "Amazon", "Apple", "Meta", "Netflix", "Twitter",
            "LinkedIn", "Uber", "Airbnb", "Stripe", "Square", "Shopify", "Adobe",
            "Deloitte", "PwC", "KPMG", "EY", "Goldman Sachs", "JP Morgan", "Morgan Stanley",
            "McKinsey", "Boston Consulting Group", "Bain & Company", "Accenture"
        ])
        location = random.choice([
            "San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX",
            "Boston, MA", "Los Angeles, CA", "Chicago, IL", "Denver, CO",
            "Remote", "Hybrid - Silicon Valley", "Remote - US", "Hybrid - NYC",
            "Miami, FL", "Washington, DC", "Atlanta, GA", "Dallas, TX"
        ])
        
        # Create job title variations
        if i == 0:
            title = job_title
        else:
            prefix = random.choice(["Senior ", "Lead ", "Principal ", "", "Staff "])
            suffix = random.choice(["", " II", " III", " (Remote)", " Manager"])
            title = prefix + job_title + suffix
        
        # Generate job URL
        job_board = random.choice([
            "linkedin.com/jobs",
            "indeed.com/jobs",
            "glassdoor.com/jobs",
            "monster.com/jobs",
            "careers.google.com",
            "jobs.apple.com",
            "amazon.jobs"
        ])
        company_slug = company.lower().replace(" ", "-")
        title_slug = title.lower().replace(" ", "-")
        job_url = f"https://www.{job_board}/company/{company_slug}/job/{title_slug}-{random.randint(100000, 999999)}"
        
        # Mix user skills with relevant skills
        job_skills = user_skills.copy()
        extra_skills = random.sample(base_skills, random.randint(3, 6))
        job_skills.extend([skill for skill in extra_skills if skill.lower() not in [s.lower() for s in job_skills]])
        
        # Calculate match percentage based on skill overlap
        user_skill_set = set(user_skills)
        job_skill_set = set(s.lower() for s in job_skills)
        match_percentage = len(user_skill_set.intersection(job_skill_set)) / len(user_skill_set) * 100
        
        sample_jobs.append({
            "Job Title": title,
            "Company": company,
            "Location": location,
            "Skills": job_skills,
            "Salary": f"${random.randint(100, 200)}K - ${random.randint(200, 300)}K",
            "MatchPercentage": round(match_percentage),
            "JobUrl": job_url
        })
    
    # Sort jobs by match percentage
    sample_jobs.sort(key=lambda x: x["MatchPercentage"], reverse=True)
    
    return sample_jobs

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
