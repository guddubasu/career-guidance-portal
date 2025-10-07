import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // ✅ use /modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './CareersPage.css';

export default function CareersPage() {
  const careers = [
    { id: 1, title: "Software Engineer", description: "Develop applications and software solutions." },
    { id: 2, title: "Data Scientist", description: "Analyze data and extract insights." },
    { id: 3, title: "Mechanical Engineer", description: "Design and maintain mechanical systems." },
    { id: 4, title: "Teacher", description: "Educate students and shape young minds." },
    { id: 5, title: "Doctor", description: "Provide medical care and save lives." },
  ];

  return (
    <div className="careers-page">
      <h1>All Career Cards</h1>

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
        {careers.map(career => (
          <SwiperSlide key={career.id}>
            <Link to={`/careers/${career.id}`} className="career-card">
              <h3>{career.title}</h3>
              <p>{career.description}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      
    </div>
  );
}
