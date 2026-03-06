import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CareersPage.css";

export default function CareersPage() {
  const navigate = useNavigate();

  const careers = [
    { id: 1, dataId: 1, title: "BFSI", description: "Banking, Finance & Insurance", baseColor: "#1E40AF", summary: "Explore careers in Banking, Finance, and Insurance sectors." },
    { id: 2, dataId: 2, title: "Defence", description: "Serve the nation", baseColor: "#047857", summary: "Defence careers include Army, Navy, Airforce, and related services." },
    { id: 3, dataId: 3, title: "Healthcare", description: "Health & Wellness", baseColor: "#DC2626", summary: "Medical, therapy, nursing, and wellness careers." },
    { id: 4, dataId: 4, title: "Education", description: "Teaching & Learning", baseColor: "#F59E0B", summary: "Teaching, Research, and Academic Administration careers." },
    { id: 5, dataId: 5, title: "Engineering", description: "Technology & Innovation", baseColor: "#DC2626", summary: "Civil, Mechanical, Electrical, and Software Engineering careers." },
    { id: 6, dataId: 6, title: "Design", description: "Creative Arts & Design", baseColor: "#9333EA", summary: "Graphic, Fashion, Product, and Interior Design opportunities." },
    { id: 7, dataId: 7, title: "Hospitality & Tourism", description: "Travel & Guest Services", baseColor: "#F59E0B", summary: "Hotel management, tourism, and travel careers." },
    { id: 8, dataId: 8, title: "IT & Computer", description: "Information Technology", baseColor: "#9333EA", summary: "Software, IT services, AI, and IT infrastructure careers." },
    { id: 9, dataId: 9, title: "Management", description: "Business & Leadership", baseColor: "#F59E0B", summary: "Business administration, leadership, and management careers." },
    { id: 10, dataId: 10, title: "Legal", description: "Law & Justice", baseColor: "#1E40AF", summary: "Law practice, judiciary, and legal consultancy careers." },
    { id: 11, dataId: 11, title: "Media", description: "Journalism & Broadcasting", baseColor: "#F59E0B", summary: "Journalism, media, broadcasting, and digital media careers." },
    { id: 12, dataId: 12, title: "Science", description: "Research & Development", baseColor: "#10B981", summary: "Research, biotech, environment, and science careers." },
    { id: 13, dataId: 13, title: "Sports", description: "Athletics & Coaching", baseColor: "#9333EA", summary: "Athletics, coaching, sports management, and physical education." },
  ];

  const getTint = (hex) => {
    const opacity = 0.12;
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div className="careers-page py-10 px-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Explore Career Sectors
      </h1>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {careers.map((career) => (
          <SwiperSlide key={career.id}>
            <div
              className="career-card relative cursor-pointer"
              style={{
                borderColor: career.baseColor,
                backgroundColor: getTint(career.baseColor),
              }}
              onClick={() => navigate(`/domain/${career.dataId}`)}
            >
              <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
              <p className="text-sm">{career.description}</p>
              <span
                className="inline-block w-12 h-1 mt-4 rounded"
                style={{ backgroundColor: career.baseColor }}
              ></span>

              <div className="mt-4 text-center">
                <button
                  className="wb-button px-4 py-2 rounded font-semibold text-white"
                  style={{ backgroundColor: career.baseColor }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/domain/${career.dataId}`);
                  }}
                >
                  Explore Careers
                </button>
              </div>

              <div className="card-summary" style={{ borderColor: career.baseColor }}>
                <h4 className="font-bold text-lg mb-2">{career.title}</h4>
                <p className="text-sm">{career.summary}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}