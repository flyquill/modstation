import React from 'react';

export default function LoadingPlaceholders() {
  const placeholders = Array.from({ length: 6 }); // create array with 6 undefined elements

  return (
    <>
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" aria-hidden="true">
      {placeholders.map((_, index) => (
        <div className="col" key={index}>
          <div className="car-card">
            <div className="car-image-container">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="259px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#404142"></rect>
              </svg>
            </div>
            <div className="car-details">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-12"></span>
              </h5>
              <p className="car-description placeholder-glow col-8">
                <span className="placeholder col-12">aaa</span>
              </p>
              <button className="btn btn-secondary btn-sm btn-add-to-cart disabled placeholder"></button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
