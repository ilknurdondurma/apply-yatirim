import React, { useState } from "react";
import { useSelector } from "react-redux";
import { grayDarkTheme, grayLightTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";
import { NavLink } from "react-router-dom";

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  

  return (
    <NavLink to={`${product ? `/product/${product.id}` :`/*` }`}>
      <div
      className="relative p-2 rounded-lg shadow-md  hover:bg-opacity-50 max-w-72 h-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={theme===lightTheme ? grayLightTheme: grayDarkTheme}
    >
      <img
        src={product.imageUrl1}
        alt={product.title ?? ""}
        className="w-full h-60 sm:h-52 object-cover"
      />
      {/* <img className="object-contain h-96 w-96" src={`data:image/jpeg;base64,${product.image}`}/> */}
      <div className="p-4 ">
        <h3 className="text-lg sm:text-xs font-bold line-clamp-1">{product.title ?? ""}</h3>
        <p className="text-sm sm:text-xs text-gray-500 line-clamp-1">
          {product.description}
        </p>
      </div>
      <div
        className={`flex items-center justify-center bg-primary/90 sm:opacity-100 opacity-0 ${
          isHovered ? "opacity-100" : ""
        } transition-opacity`}
      >
        <NavLink to={`/iletisim`}>
          <button className={`px-4 py-2  text-white rounded-lg sm:text-xs `}>
            İletişime Geç
          </button>
        </NavLink>
      </div>
    </div>
    </NavLink>
  );
}

export default ProductCard;
