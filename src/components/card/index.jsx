import React, { useState } from "react";

function ProductCard({ product }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927C9.442 1.958 10.558 1.958 10.951 2.927L12.941 7.747L18.129 8.623C19.156 8.803 19.56 10.096 18.835 10.839L15.047 14.627L15.902 19.77C16.084 20.801 15.049 21.554 14.14 21.08L10 19.051L5.86 21.08C4.951 21.554 3.916 20.801 4.098 19.77L4.953 14.627L1.165 10.839C0.44 10.096 0.844 8.803 1.871 8.623L7.059 7.747L9.049 2.927Z" />
          </svg>
        ))}
        {halfStar && (
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927C9.442 1.958 10.558 1.958 10.951 2.927L12.941 7.747L18.129 8.623C19.156 8.803 19.56 10.096 18.835 10.839L15.047 14.627L15.902 19.77C16.084 20.801 15.049 21.554 14.14 21.08L10 19.051L5.86 21.08C4.951 21.554 3.916 20.801 4.098 19.77L4.953 14.627L1.165 10.839C0.44 10.096 0.844 8.803 1.871 8.623L7.059 7.747L9.049 2.927Z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-5 h-5 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927C9.442 1.958 10.558 1.958 10.951 2.927L12.941 7.747L18.129 8.623C19.156 8.803 19.56 10.096 18.835 10.839L15.047 14.627L15.902 19.77C16.084 20.801 15.049 21.554 14.14 21.08L10 19.051L5.86 21.08C4.951 21.554 3.916 20.801 4.098 19.77L4.953 14.627L1.165 10.839C0.44 10.096 0.844 8.803 1.871 8.623L7.059 7.747L9.049 2.927Z" />
          </svg>
        ))}
      </div>
    );
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative p-4 border rounded-lg shadow-md bg-white hover:bg-primary/10 w-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-1">
          {product.description}
        </p>
      </div>
      <div
        className={`flex items-center justify-center bg-primary/90 bg-opacity-0 ${
          isHovered ? "bg-opacity-100" : ""
        } transition-opacity`}
      >
        <button
          className={`px-4 py-2 bg-primary text-white rounded-lg ${
            isHovered ? "" : "hidden"
          }`}
        >
          İletişime Geç
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
