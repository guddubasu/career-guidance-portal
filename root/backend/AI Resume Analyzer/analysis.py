import PyPDF2
import re
from keywords import CAREER_KEYWORDS

# COMPLETE CAREER_RECOMMENDATIONS for ALL 10 careers

CAREER_RECOMMENDATIONS = {
    "IT": {
        "essential": ["AWS", "Docker", "Git", "REST API", "MongoDB"],
        "high_impact": ["Kubernetes", "Jenkins", "Terraform", "microservices"],
        "certifications": ["AWS Certified Developer", "Google Cloud Associate", "Docker Certified Associate"],
        "projects": ["Deployed REST API on AWS", "Containerized app with Docker", "CI/CD pipeline"]
    },
    "BFSI": {
        "essential": ["SAP", "Tally", "Excel VBA", "SQL queries"],
        "high_impact": ["Power BI", "Tableau", "financial modeling"],
        "certifications": ["CFA Level 1", "NISM", "FRM"],
        "projects": ["Financial dashboard in Power BI", "Excel VBA automation", "SAP implementation"]
    },
    "Design": {
        "essential": ["Figma", "Photoshop", "UI/UX", "prototyping"],
        "high_impact": ["Adobe XD", "Sketch", "motion graphics"],
        "certifications": ["Google UX Design", "Adobe Certified Expert"],
        "projects": ["Figma prototype for mobile app", "Complete brand identity", "UI redesign project"]
    },
    "Engineering": {
        "essential": ["AutoCAD", "SolidWorks", "MATLAB"],
        "high_impact": ["ANSYS", "CATIA", "finite element analysis"],
        "certifications": ["Autodesk Certified Professional", "SolidWorks CSWA"],
        "projects": ["CAD design for mechanical part", "FEA simulation", "Product prototype"]
    },
    "General": {
        "essential": ["Project Management", "Agile", "Scrum"],
        "high_impact": ["Stakeholder management", "business analysis"],
        "certifications": ["PMP", "Scrum Master", "CAPM"],
        "projects": ["Led cross-functional team", "Delivered project on time", "Stakeholder presentations"]
    },
    "Government": {
        "essential": ["Public Policy", "MS Office", "data analysis"],
        "high_impact": ["policy analysis", "regulatory compliance"],
        "certifications": ["UPSC preparation", "Data Analysis with Excel"],
        "projects": ["Government scheme analysis", "Policy research report"]
    },
    "Hospitality & Tourism": {
        "essential": ["Customer Service", "Event Management", "MS Office"],
        "high_impact": ["reservation systems", "hotel operations"],
        "certifications": ["Hotel Management Diploma", "Food Safety"],
        "projects": ["Event coordination", "Customer service training", "Tour package design"]
    },
    "Legal": {
        "essential": ["Legal Research", "MS Word", "contract drafting"],
        "high_impact": ["litigation support", "corporate law"],
        "certifications": ["LLB", "Diploma in Corporate Law"],
        "projects": ["Legal research paper", "Contract review", "Case analysis"]
    },
    "Logistics": {
        "essential": ["Supply Chain", "Excel", "inventory management"],
        "high_impact": ["SAP MM", "warehouse management"],
        "certifications": ["APICS CSCP", "Six Sigma Green Belt"],
        "projects": ["Inventory optimization", "Supply chain analysis", "Logistics dashboard"]
    },
    "Management": {
        "essential": ["Leadership", "Excel", "PowerPoint"],
        "high_impact": ["HR management", "marketing strategy"],
        "certifications": ["MBA", "PMP", "Google Project Management"],
        "projects": ["Team leadership", "Marketing campaign", "Business plan"]
    }
}


def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text.lower()
    return text

def analyze_resume(pdf_path, selected_career):
    text = extract_text_from_pdf(pdf_path)
    target_keywords = CAREER_KEYWORDS.get(selected_career, [])
    
    matched_keywords = []
    for keyword in target_keywords:
        if re.search(r'\b' + re.escape(keyword.lower()) + r'\b', text):
            matched_keywords.append(keyword)
    
    match_score = min(100, (len(matched_keywords) / max(1, len(target_keywords)) * 100))
    recommendations = CAREER_RECOMMENDATIONS.get(selected_career, {})
    
    return {
        "match_score": round(match_score, 1),
        "detected_skills": matched_keywords[:10],
        "matched_keywords_count": len(matched_keywords),
        "total_career_keywords": len(target_keywords),
        "recommendations": recommendations,
        "missing_essential": [skill for skill in recommendations.get("essential", []) 
                           if not re.search(r'\b' + re.escape(skill.lower()) + r'\b', text)]
    }
