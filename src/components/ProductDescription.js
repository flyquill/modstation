import React from "react";

export default function ProductDescription({ description }) {
  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Package Description</h2>
    <div
      className="container"
      dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
