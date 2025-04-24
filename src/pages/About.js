import React from 'react';

export default function About() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="https://via.placeholder.com/500x300"
            alt="About us"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">About Us</h2>
          <p className="text-light">
            We are a team of passionate developers and designers dedicated to building
            modern and user-friendly web experiences. Our mission is to create high-quality
            applications that solve real-world problems and delight users.
          </p>
          <p className="text-light">
            Whether it's frontend or backend development, UI/UX design, or API integration,
            we approach each project with creativity, precision, and care.
          </p>
          <button className="btn btn-primary mt-3">Learn More</button>
        </div>
      </div>
    </div>
  );
}
