import React from "react";
import { NavLink } from "react-router-dom";

function Banner({ banner }) {
  const defaultBanner = {
    title: 'Yükleniyor...',
    description: 'Lütfen bekleyin...',
    imageUrl1: '' // Default image in case base64 is not provided
  };

  const bannerData = banner || defaultBanner;
  
  return (
    <div
      className="relative flex items-center justify-center h-96"
      style={{
        backgroundImage: `url(data:image/jpeg;base64,${bannerData.imageUrl1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">{bannerData.title ?? ""}</h1>
        <p className="text-xl mb-6">{bannerData.description ?? ""}</p>
        <NavLink
          to="/urunler"
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Tüm Ürünlerimizi Keşfet
        </NavLink>
      </div>
    </div>
  );
}

export default Banner;
