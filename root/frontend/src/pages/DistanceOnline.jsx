import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DistanceOnline.css';
import onlineLearningImage from '../assets/distance-learning-cp.jpg';

export default function DistanceOnline() {
  const navigate = useNavigate();

  const platforms = [
    { name: 'Indira Gandhi National Open University (IGNOU)', link: 'https://ignou.ac.in' },
    { name: 'Narsee Monjee Institute of Management Studies (NMIMS)', link: 'https://nmims.edu' },
    { name: 'National Institute of Open Schooling (NIOS)', link: 'https://nios.ac.in' },
    { name: 'NPTEL / Swayam', link: 'https://swayam.gov.in' },
    { name: 'Udemy', link: 'https://udemy.com' },
    { name: 'Coursera', link: 'https://coursera.org' },
    { name: 'edX', link: 'https://edx.org' },
    { name: 'Khan Academy', link: 'https://khanacademy.org' },
    { name: 'FutureLearn', link: 'https://futurelearn.com' },
  ];

  return (
    <div className="distance-container">
      
      {/* Breadcrumb / Go Back */}
      <div className="distance-breadcrumb">
        <span
          onClick={() => navigate(-1)}
          className="cursor-pointer distance-go-back"
        >
          &lt;&lt; Go Back
        </span>
        <span className="breadcrumb-separator">|</span>
        <span className="breadcrumb-current">Distance & Online Learning</span>
      </div>

      {/* Hero Section */}
      <div className="distance-hero">
        <div className="hero-text">
          <h1>Explore Distance & Online Learning</h1>
          <p>Discover flexible education paths that fit your life and career goals.</p>
        </div>
        <div className="hero-image">
          <img
            src={onlineLearningImage}
            alt="Online Learning Illustration"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="distance-content">
        
        <h2>Distance Learning</h2>
        <p>
          Distance learning, also called distance education, is a form of education in which students learn remotely. They do not have face-to-face interaction with instructors or other students. Educational institutes send course materials to students by mail and assignments are completed online or returned to the teachers by mail.
        </p>
        <p>
          This method is ideal for individuals who live in remote areas, have work commitments, or prefer a self-paced approach without being tied to a physical campus.
        </p>

        <h2>Online Learning</h2>
        <p>
          Online learning is a type of distance education conducted entirely over the internet. It uses digital platforms, video conferencing, and online forums to facilitate learning. This method is interactive and provides access to a wide range of courses and certifications worldwide.
        </p>
        <p>
          The flexibility of online learning allows you to pursue your education from anywhere, at any time. It's an excellent way to acquire new skills, earn a degree, or advance your career without geographic limitations.
        </p>

        <h2>Popular Distance & Online Learning Platforms</h2>
        <div className="platform-cards">
          {platforms.map((platform, index) => (
            <a
              key={index}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="platform-card"
            >
              {platform.name}
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
