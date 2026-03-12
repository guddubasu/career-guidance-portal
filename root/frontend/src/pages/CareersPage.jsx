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