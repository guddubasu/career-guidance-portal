// src/data.js - 25 Questions for CareerCompass (5 pages × 5 questions)
export const questions = [
  // 🏗️ PAGE 1 (Q1-5): Realistic + Investigative (Hands-on + Analytical)
  { id: 1, text: "Inspect a roof for leaks or repair an air conditioning system", category: "R" },
  { id: 2, text: "Use precision machines or install kitchen cabinets", category: "R" },
  { id: 3, text: "Analyze the structure of molecules", category: "I" },
  { id: 4, text: "Do scientific experiments or research", category: "I" },
  { id: 5, text: "Study earthquakes or nuclear energy properties", category: "I" },

  // 🎨 PAGE 2 (Q6-10): Artistic + Social (Creative + Helping)
  { id: 6, text: "Design a magazine cover or greeting card", category: "A" },
  { id: 7, text: "Paint a portrait or write a poem", category: "A" },
  { id: 8, text: "Teach social skills to children", category: "S" },
  { id: 9, text: "Help disabled people with daily routines", category: "S" },
  { id: 10, text: "Counsel people with depression", category: "S" },

  // 💼 PAGE 3 (Q11-15): Enterprising + Conventional (Leadership + Organized)
  { id: 11, text: "Negotiate business partnerships", category: "E" },
  { id: 12, text: "Lead a business team or start a company", category: "E" },
  { id: 13, text: "Track monthly expenses for a company", category: "C" },
  { id: 14, text: "Review financial records or use spreadsheets", category: "C" },
  { id: 15, text: "Calculate construction project costs", category: "C" },

  // 🧠 PAGE 4 (Q16-20): Big Five - Openness + Conscientiousness + Extraversion
  { id: 16, text: "I have a vivid imagination and value art", category: "O" },
  { id: 17, text: "I am always prepared and organized", category: "C_BF" },
  { id: 18, text: "I am talkative and the life of the party", category: "E_BF" },
  { id: 19, text: "I am interested in abstract ideas", category: "O" },
  { id: 20, text: "I get chores done right away", category: "C_BF" },

  // ❤️ PAGE 5 (Q21-25): Big Five - Agreeableness + Neuroticism + Stability
  { id: 21, text: "I treat everyone with kindness", category: "A_BF" },
  { id: 22, text: "I often feel anxious or moody (reverse scored)", category: "N", reverse: true },
  { id: 23, text: "I stop to help other people", category: "A_BF" },
  { id: 24, text: "I often worry about what could go wrong (reverse)", category: "N", reverse: true },
  { id: 25, text: "I am skilled in handling social situations", category: "E_BF" }
];

// ✅ YOUR EXACT 20 CAREERS (dataId matches perfectly)
export const careers = [
  { id: 1, dataId: 1, title: "BFSI", description: "Banking, Finance & Insurance", baseColor: "#1E40AF", summary: "Explore careers in Banking, Finance, and Insurance sectors." },
  { id: 2, dataId: 2, title: "Defence", description: "Serve the Nation", baseColor: "#047857", summary: "Defence careers include Army, Navy, Airforce and national security services." },
  { id: 3, dataId: 3, title: "Healthcare", description: "Health & Wellness", baseColor: "#DC2626", summary: "Medical, nursing, therapy and healthcare service careers." },
  { id: 4, dataId: 4, title: "Education", description: "Teaching & Learning", baseColor: "#F59E0B", summary: "Teaching, academic research and educational administration careers." },
  { id: 5, dataId: 5, title: "Engineering", description: "Technology & Innovation", baseColor: "#2563EB", summary: "Civil, Mechanical, Electrical and other engineering careers." },
  { id: 6, dataId: 6, title: "Agriculture", description: "Farming & Agribusiness", baseColor: "#15803D", summary: "Careers related to agriculture, farming technology and agribusiness." },
  { id: 7, dataId: 7, title: "Hospitality", description: "Travel & Tourism", baseColor: "#F97316", summary: "Hotel management, tourism and hospitality service careers." },
  { id: 8, dataId: 8, title: "Vocational", description: "Power & Electrical Systems", baseColor: "#2563EB", summary: "Careers in electrical systems, power generation and energy." },
  { id: 9, dataId: 9, title: "IT & Computer", description: "Information Technology", baseColor: "#9333EA", summary: "Software development, AI, data science and IT infrastructure careers." },
  { id: 10, dataId: 10, title: "Management", description: "Business & Leadership", baseColor: "#F59E0B", summary: "Business administration, leadership and management careers." },
  { id: 11, dataId: 11, title: "Railways", description: "Railway Infrastructure", baseColor: "#1E40AF", summary: "Engineering and operational careers in the railway sector." },
  { id: 12, dataId: 12, title: "Police", description: "Law Enforcement", baseColor: "#DC2626", summary: "Police services and law enforcement careers." },
  { id: 13, dataId: 13, title: "Civil Services", description: "Government Administration", baseColor: "#10B981", summary: "Administrative careers such as IAS, IPS and government officers." },
  { id: 14, dataId: 14, title: "Banking", description: "Bank Operations", baseColor: "#1E40AF", summary: "Bank clerks, officers and banking service careers." },
  { id: 15, dataId: 15, title: "Research", description: "Scientific Research", baseColor: "#9333EA", summary: "Scientific research, laboratory and innovation careers." },
  { id: 16, dataId: 16, title: "Sports", description: "Athletics & Coaching", baseColor: "#F59E0B", summary: "Professional sports, coaching and sports management careers." },
  { id: 17, dataId: 17, title: "Design", description: "Creative Arts & Design", baseColor: "#9333EA", summary: "Graphic, fashion, product and creative design careers." },
  { id: 18, dataId: 18, title: "Aviation", description: "Airline & Flight Careers", baseColor: "#10B981", summary: "Pilot, aviation management and airline industry careers." },
  { id: 19, dataId: 19, title: "Media", description: "Journalism & Broadcasting", baseColor: "#F59E0B", summary: "Journalism, media production and broadcasting careers." },
  { id: 20, dataId: 20, title: "Entrepreneurship", description: "Startups & Innovation", baseColor: "#9333EA", summary: "Startup founders, innovators and business creators." }
];

// 🎯 Backend Scoring: Category → Your 20 Careers Mapping
export const careerMapping = {
  // Holland Code Mapping (12 questions)
  R: [5, 8, 11, 18, 2],      // Engineering, Vocational, Railways, Aviation, Defence
  I: [9, 15],                // IT/Computer, Research
  A: [17, 19],               // Design, Media
  S: [3, 4, 16],             // Healthcare, Education, Sports
  E: [10, 13, 20],           // Management, Civil Services, Entrepreneurship
  C: [1, 14],                // BFSI, Banking

  // Big Five Mapping (13 questions)
  O: [9, 17, 15],            // Openness → IT, Design, Research
  C_BF: [1, 10, 14],         // Conscientious → BFSI, Management, Banking
  E_BF: [10, 13, 20],        // Extraversion → Management, Civil Services, Entrepreneurship
  A_BF: [3, 4],              // Agreeableness → Healthcare, Education
  N: [5, 12]                 // Low Neuroticism → Engineering, Police (stable)
};
