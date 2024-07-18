import React, { useState } from "react";

function ProductCard({ product }) {
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
        className={`flex items-center justify-center bg-primary/90 opacity-0 ${
          isHovered ? "opacity-100" : ""
        } transition-opacity`}
      >
        <button className={`px-4 py-2  text-white rounded-lg `}>
          İletişime Geç
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
