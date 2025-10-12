import React from "react";
import { useParams, Link } from "react-router-dom";

const careerData = {
  1: { title: "BFSI", summary: "Banking, Finance & Insurance", requiredSubjects: ["Mathematics", "Economics"] },
  2: { title: "Defence", summary: "Serve the nation", requiredSubjects: ["Physics", "Mathematics"] },
  3: { title: "Healthcare", summary: "Medical & Care", requiredSubjects: ["Biology", "Chemistry"] },
  4: { title: "IT", summary: "Information Technology", requiredSubjects: ["Computer Science", "Mathematics"] },
  5: { title: "Agriculture", summary: "Farming & Sustainability", requiredSubjects: ["Biology", "Economics"] },
  6: { title: "Design", summary: "Graphic, Product & Fashion Design", requiredSubjects: ["Art", "Mathematics"] },
  7: { title: "Education", summary: "Teaching, Research & Administration", requiredSubjects: ["Education", "Psychology"] },
  8: { title: "Engineering", summary: "Civil, Mechanical, Electrical, etc.", requiredSubjects: ["Mathematics", "Physics"] },
  9: { title: "Fine Arts", summary: "Painting, Sculpture, Photography, Theatre", requiredSubjects: ["Art", "Creativity"] },
  10: { title: "Fisheries", summary: "Aquaculture & Fishery Management", requiredSubjects: ["Biology", "Chemistry"] },
  11: { title: "General", summary: "Diverse and unconventional career paths", requiredSubjects: ["Varies"] },
  12: { title: "Government", summary: "Administrative & Civil Services", requiredSubjects: ["General Studies", "Mathematics"] },
  13: { title: "Health & Wellness", summary: "Fitness, Therapy & Paramedical", requiredSubjects: ["Biology", "Physical Education"] },
  14: { title: "Hospitality & Tourism", summary: "Hotel Management, Travel & Events", requiredSubjects: ["Management", "Communication"] },
  15: { title: "Language", summary: "Linguistics, Translation & Interpretation", requiredSubjects: ["Languages", "Literature"] },
  16: { title: "Legal", summary: "Law Practice, Judiciary & Consultancy", requiredSubjects: ["Political Science", "History"] },
  17: { title: "Logistics", summary: "Supply Chain, Warehousing & Distribution", requiredSubjects: ["Mathematics", "Management"] },
  18: { title: "Management", summary: "Business Administration & Project Management", requiredSubjects: ["Economics", "Mathematics"] },
  19: { title: "Media", summary: "Journalism, Broadcasting & Digital Media", requiredSubjects: ["Communication", "Languages"] },
  20: { title: "Science", summary: "Research, Biotech & Environmental Science", requiredSubjects: ["Physics", "Chemistry", "Biology"] },
};

export default function CareerDetail() {
  const { id } = useParams();
  const career = careerData[Number(id)];

  if (!career)
    return <p className="p-10 text-center text-gray-600">Career not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6 pt-20">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{career.title}</h1>
      <p className="text-lg mb-6 text-gray-700 text-center max-w-xl">{career.summary}</p>

      {career.requiredSubjects?.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md">
          <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Required Subjects
          </h3>
          <ul className="list-disc list-inside space-y-2 text-center text-gray-700">
            {career.requiredSubjects.map((sub, i) => (
              <li key={i}>{sub}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "32px" }}>
        <Link
          to="/careers"
          style={{
            backgroundColor: "#2563eb", // blue
            color: "#ffffff",
            fontWeight: 600,
            fontStyle: "italic",
            padding: "12px 28px",
            borderRadius: "8px",
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            display: "inline-block",
          }}
        >
          ⬅ Back to Careers
        </Link>
      </div>
    </div>
  );
}
