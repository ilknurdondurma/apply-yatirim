import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { grayDarkTheme, grayLightTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";

const Filter = ({ categories, selectedCategory, handleCategoryChange }) => {
    const theme=useSelector((state)=>state.theme.theme)

  return (
    <div className="w-full col-span-1 flex flex-col rounded-lg mx-5 p-1" >
      <span className="bg-primary text-white p-5 mx-2 rounded-lg">KATEGORİLER</span>
      <button style={theme===lightTheme ? grayDarkTheme : grayLightTheme}
        className={`py-2 px-4 m-2 rounded-lg border-2 ${
          selectedCategory === "all" ? "bg-gray-200" : "bg-white"
        }`}
        onClick={() => handleCategoryChange("all")}
      >
        Tüm Kategoriler
      </button>
      {categories.map((category) => (
        <button style={theme===lightTheme ? grayLightTheme : grayDarkTheme}
          key={category.id}
          className={`py-3 px-4 mx-2 mb-1 border-t-[1px] rounded-lg flex justify-between items-center hover:bg-gray-400 ${
            selectedCategory === category.title ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => handleCategoryChange(category.id)}
        >
          <input 
          type="radio"
          checked={selectedCategory === category.id || selectedCategory==="all"}
          /> {category.title} <FaChevronRight />
        </button>
      ))}
    </div>
  );
};

export default Filter;
