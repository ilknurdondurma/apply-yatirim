import React from "react";
import { NavLink } from "react-router-dom";
import bannerData from "../../dummy-data/bannerData";
import image from "../../assets/bg.png";

function Banner() {
  const { title, subtitle, buttonText, buttonLink, backgroundImage } =
    bannerData;

  return (
    <div
      className="relative flex items-center justify-center h-96"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-6">{subtitle}</p>
        <NavLink
          to={buttonLink}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          {buttonText}
        </NavLink>
      </div>
    </div>
  );
}

export default Banner;
