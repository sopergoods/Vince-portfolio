import React from 'react';
import './Timeline.css';

const timelineData = [
  {
    title: "Hello World",
    role: "Started learning programming",
    year: "2022",
  },
  {
    title: "Improve Coding",
    role: "Sharpening programming skills through practice and self-study",
    year: "2023 - 2024",
  },
  {
    title: "Mobile Legends",
    role: "School E-Sports team participation",
    year: "2023 - 2024",
  },
  {
    title: "ISITE Representative",
    role: "Student representative for Information Systems and Technology",
    year: "2023 - 2024",
  },
  {
    title: "Learning Networking",
    role: "Network fundamentals, routing, and configuration",
    year: "2024",
  },
  {
    title: "Learning Git",
    role: "Version control and collaboration workflows",
    year: "2025",
  },
  {
    title: "Summer of 2025",
    role: "Learning Arduino — hardware prototyping and embedded systems",
    year: "2025",
  },
  {
    title: "OJT Completed",
    role: "300 hours — SSS Shaw Blvd., Mandaluyong City",
    year: "2026",
  }
];

const Timeline = () => {
  return (
    <div className="experience-list">
      {/* Reverse array to show newest at the top, just like the reference */}
      {[...timelineData].reverse().map((item, index) => (
        <div key={index} className="exp-item">
          {/* Using active-dot for the very first item (newest) */}
          <div className={`exp-dot ${index === 0 ? 'active-dot' : ''}`}></div>
          <div className="exp-content">
            <h3 className="exp-title">{item.title}</h3>
            <p className="exp-company">{item.role}</p>
          </div>
          <span className="exp-year">{item.year}</span>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
