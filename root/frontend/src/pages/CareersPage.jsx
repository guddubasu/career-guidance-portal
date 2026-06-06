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

    {
      id: 1,
      dataId: 1,
      title: "STEM",
      description: "STEM (Science, Technology, Engineering & Mathematics)",
      baseColor: "#1E40AF",
      summary:
        "Careers in software, core engineering, scientific research, mathematics, technology, and innovation."
    },

    // {
    //   id: 2,
    //   dataId: 2,
    //   title: "Core Engineering",
    //   description: "Engineering & Manufacturing",
    //   baseColor: "#047857",
    //   summary:
    //     "Mechanical, Civil, Electrical, Chemical and industrial engineering careers."
    // },

    {
      id: 2,
      dataId: 2,
      title: "Healthcare & Medicine",
      description: "Health & Wellness",
      baseColor: "#DC2626",
      summary:
        "Medical, nursing, pharmacy, diagnostics and healthcare service careers."
    },

    {
      id: 3,
      dataId: 3,
      title: "Commerce, Business & Management",
      description: "Business & Leadership",
      baseColor: "#F59E0B",
      summary:
        "Careers in business management, operations, marketing and corporate leadership."
    },

    {
      id: 4,
      dataId: 4,
      title: "Law & Legal Services",
      description: "Justice & Legal Systems",
      baseColor: "#2563EB",
      summary:
        "Careers in advocacy, judiciary, legal consulting and corporate law."
    },

    {
      id: 5,
      dataId: 5,
      title: "Arts, Design & Creative Fields",
      description: "Creativity & Design",
      baseColor: "#15803D",
      summary:
        "Graphic design, fashion design, animation and creative arts careers."
    },

    {
      id: 6,
      dataId: 6,
      title: "Media, Communication & Entertainment",
      description: "Journalism & Entertainment",
      baseColor: "#F97316",
      summary:
        "Careers in journalism, film, television, content creation and public communication."
    },

    {
      id: 7,
      dataId: 7,
      title: "Education & Teaching",
      description: "Teaching & Learning",
      baseColor: "#2563EB",
      summary:
        "Teaching, academic research, training and educational administration careers."
    },

    {
      id: 8,
      dataId: 8,
      title: "Government & Public Services",
      description: "Public Administration",
      baseColor: "#9333EA",
      summary:
        "Civil services, administration, public welfare and governance careers."
    },

    {
      id: 9,
      dataId: 9,
      title: "Finance & Banking",
      description: "Finance & Investment",
      baseColor: "#F59E0B",
      summary:
        "Banking, investment, accounting, insurance and financial planning careers."
    },

    {
      id: 10,
      dataId: 10,
      title: "Agriculture & Environment",
      description: "Farming & Sustainability",
      baseColor: "#1E40AF",
      summary:
        "Agriculture, environmental science, forestry and agribusiness careers."
    },

    {
      id: 11,
      dataId: 11,
      title: "Travel, Tourism & Hospitality",
      description: "Hospitality & Tourism",
      baseColor: "#DC2626",
      summary:
        "Hotel management, tourism, event management and hospitality careers."
    },

    {
      id: 12,
      dataId: 12,
      title: "Sports & Fitness",
      description: "Athletics & Wellness",
      baseColor: "#10B981",
      summary:
        "Professional sports, coaching, fitness training and sports management careers."
    },

    {
      id: 13,
      dataId: 13,
      title: "Skilled Trades & Vocational Careers",
      description: "Technical & Practical Skills",
      baseColor: "#1E40AF",
      summary:
        "Electricians, technicians, mechanics and vocational trade careers."
    },

    {
      id: 14,
      dataId: 14,
      title: "Psychology & Social Work",
      description: "Mental Health & Society",
      baseColor: "#9333EA",
      summary:
        "Counselling, psychology, therapy and social welfare careers."
    },

    {
      id: 15,
      dataId: 15,
      title: "Administrative & Support Roles",
      description: "Operations & Administration",
      baseColor: "#F59E0B",
      summary:
        "Office management, administration, HR and support service careers."
    },

    {
      id: 16,
      dataId: 16,
      title: "Emerging & Modern Careers",
      description: "Future Technologies",
      baseColor: "#9333EA",
      summary:
        "Careers in AI, blockchain, robotics, sustainability and new-age industries."
    },

    {
      id: 17,
      dataId: 17,
      title: "Entrepreneurship & Freelancing",
      description: "Self-Employment & Startups",
      baseColor: "#10B981",
      summary:
        "Startup founders, freelancers, consultants and independent business careers."
    },

    // {
    //   id: 19,
    //   dataId: 19,
    //   title: "Pure Sciences",
    //   description: "Research & Discovery",
    //   baseColor: "#F59E0B",
    //   summary:
    //     "Physics, Chemistry, Biology and scientific research careers."
    // },

    // {
    //   id: 20,
    //   dataId: 20,
    //   title: "Entrepreneurship",
    //   description: "Business Creation & Innovation",
    //   baseColor: "#9333EA",
    //   summary:
    //     "Building startups, launching businesses and creating innovative ventures."
    // }

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

    <div className="careers-page">

      <h1 className="page-title">
        Explore Career Sectors
      </h1>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={25}
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
              className="career-card"
              style={{
                borderColor: career.baseColor,
                backgroundColor: getTint(career.baseColor),
              }}
              onClick={() => navigate(`/domain/${career.dataId}`)}
            >

              {/* CARD CONTENT */}

              <div className="card-content">

                <div
                  className="card-top-line"
                  style={{
                    backgroundColor: career.baseColor,
                  }}
                ></div>

                <h3 className="career-title">
                  {career.title}
                </h3>

                <p className="career-description">
                  {career.description}
                </p>

                <button
                  className="explore-btn"
                  style={{
                    backgroundColor: career.baseColor,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/domain/${career.dataId}`);
                  }}
                >
                  Explore Careers
                </button>

              </div>

              {/* HOVER OVERLAY */}

              <div className="card-summary">

                <div
                  className="summary-accent"
                  style={{
                    backgroundColor: career.baseColor,
                  }}
                ></div>

                <h4 className="summary-title">
                  {career.title}
                </h4>

                <p className="summary-text">
                  {career.summary}
                </p>

                <button
                  className="summary-btn"
                  style={{
                    backgroundColor: career.baseColor,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/domain/${career.dataId}`);
                  }}
                >
                  Explore Careers
                </button>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </div>
  );
}