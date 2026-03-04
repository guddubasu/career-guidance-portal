import React from "react";
import { useParams, Link } from "react-router-dom";

const careerData = {
  1: { 
    title: "BFSI", 
    summary: "Banking, Finance & Insurance sector offering careers in banking operations, financial analysis, insurance services and investment management.",
    requiredSubjects: ["Mathematics", "Economics"],
    themeColor: "linear-gradient(to right, #1e3a8a, #2563eb)"
  },
  2: { 
    title: "Defence", 
    summary: "Serve the nation through Army, Navy, Air Force and paramilitary services.",
    requiredSubjects: ["Physics", "Mathematics"],
    themeColor: "linear-gradient(to right, #6b8e23, #9acd32)"
  },
  3: { 
    title: "Healthcare", 
    summary: "Medical and healthcare professions including doctors, nurses, therapists and healthcare administrators.",
    requiredSubjects: ["Biology", "Chemistry"],
    themeColor: "linear-gradient(to right, #b91c1c, #ef4444)"
  },
  4: { 
    title: "IT", 
    summary: "Information Technology careers such as software development, cybersecurity, AI and data science.",
    requiredSubjects: ["Computer Science", "Mathematics"],
    themeColor: "linear-gradient(to right, #0f172a, #2563eb)"
  },
  5: { 
    title: "Agriculture", 
    summary: "Careers in farming, agribusiness, food production and sustainable agriculture.",
    requiredSubjects: ["Biology", "Economics"],
    themeColor: "linear-gradient(to right, #065f46, #10b981)"
  },
  6: { 
    title: "Design", 
    summary: "Creative careers in graphic, product, interior and fashion design.",
    requiredSubjects: ["Art", "Mathematics"],
    themeColor: "linear-gradient(to right, #9333ea, #ec4899)"
  },
  7: { 
    title: "Education", 
    summary: "Teaching, academic research, curriculum development and educational administration.",
    requiredSubjects: ["Education", "Psychology"],
    themeColor: "linear-gradient(to right, #f59e0b, #f97316)"
  },
  8: { 
    title: "Engineering", 
    summary: "Civil, Mechanical, Electrical, Computer and other engineering fields.",
    requiredSubjects: ["Mathematics", "Physics"],
    themeColor: "linear-gradient(to right, #1f2937, #3b82f6)"
  },
  9: { 
    title: "Fine Arts", 
    summary: "Painting, sculpture, theatre, photography and performing arts.",
    requiredSubjects: ["Art", "Creativity"],
    themeColor: "linear-gradient(to right, #be185d, #f43f5e)"
  },
  10: { 
    title: "Fisheries", 
    summary: "Aquaculture, fishery science and marine resource management.",
    requiredSubjects: ["Biology", "Chemistry"],
    themeColor: "linear-gradient(to right, #0e7490, #06b6d4)"
  },
  11: { 
    title: "General", 
    summary: "Diverse and unconventional career paths across multiple industries.",
    requiredSubjects: ["Varies"],
    themeColor: "linear-gradient(to right, #374151, #6b7280)"
  },
  12: { 
    title: "Government", 
    summary: "Administrative services, civil services, public sector jobs and policy roles.",
    requiredSubjects: ["General Studies", "Mathematics"],
    themeColor: "linear-gradient(to right, #7c2d12, #ea580c)"
  },
  13: { 
    title: "Health & Wellness", 
    summary: "Fitness training, physiotherapy, nutrition, yoga and paramedical careers.",
    requiredSubjects: ["Biology", "Physical Education"],
    themeColor: "linear-gradient(to right, #15803d, #22c55e)"
  },
  14: { 
    title: "Hospitality & Tourism", 
    summary: "Hotel management, travel operations, event management and tourism services.",
    requiredSubjects: ["Management", "Communication"],
    themeColor: "linear-gradient(to right, #7c3aed, #8b5cf6)"
  },
  15: { 
    title: "Language", 
    summary: "Translation, interpretation, linguistics and foreign language careers.",
    requiredSubjects: ["Languages", "Literature"],
    themeColor: "linear-gradient(to right, #db2777, #f472b6)"
  },
  16: { 
    title: "Legal", 
    summary: "Law practice, judiciary, corporate law and legal consultancy.",
    requiredSubjects: ["Political Science", "History"],
    themeColor: "linear-gradient(to right, #111827, #374151)"
  },
  17: { 
    title: "Logistics", 
    summary: "Supply chain management, warehousing and transportation management.",
    requiredSubjects: ["Mathematics", "Management"],
    themeColor: "linear-gradient(to right, #92400e, #f59e0b)"
  },
  18: { 
    title: "Management", 
    summary: "Business administration, HR, marketing and project management careers.",
    requiredSubjects: ["Economics", "Mathematics"],
    themeColor: "linear-gradient(to right, #1d4ed8, #3b82f6)"
  },
  19: { 
    title: "Media", 
    summary: "Journalism, digital media, broadcasting and content creation.",
    requiredSubjects: ["Communication", "Languages"],
    themeColor: "linear-gradient(to right, #9f1239, #f43f5e)"
  },
  20: { 
    title: "Science", 
    summary: "Research, biotechnology, environmental science and scientific innovation.",
    requiredSubjects: ["Physics", "Chemistry", "Biology"],
    themeColor: "linear-gradient(to right, #047857, #10b981)"
  },
};

export default function CareerDetail() {
  const { id } = useParams();
  const career = careerData[Number(id)];

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-gray-600">Career Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Banner */}
      <div
        className="text-white py-12 px-8"
        style={{ background: career.themeColor }}
      >
        <h1 className="text-4xl font-bold">{career.title}</h1>
        <p className="mt-3 text-lg max-w-2xl">{career.summary}</p>
      </div>

      {/* Subjects Section */}
      <div className="flex justify-center mt-10 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Required Subjects
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-center">
            {career.requiredSubjects.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-8 pb-10">
        <Link
          to="/careers"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          ⬅ Back to Careers
        </Link>
      </div>

    </div>
  );
}