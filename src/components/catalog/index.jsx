import React from "react";
import book from "../../assets/book.jpg";
import { useSelector } from "react-redux";
import { lightTheme, grayLightTheme, grayDarkTheme } from "../../redux/reducers/theme/themeReducers";

function CatalogItem({ catalog }) {
  const theme = useSelector((state) => state.theme.theme);
  
  const handleDownload = () => {
    alert(`"${catalog.name}" kataloğu indiriliyor...`);
  };

  const appliedTheme = theme === lightTheme ? grayLightTheme : grayDarkTheme;

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-1 justify-between items-center m-5 p-5 rounded-lg shadow-xl mx-auto `} style={appliedTheme}>
      <div className="p-10 md:p-2 sm:p-1 flex items-center justify-center mb-4 ">
        <img
          src={book}
          alt={catalog.name}
          className="object-cover rounded-lg border-[1px] p-2"
        />
      </div>
      <div className="flex flex-col p-5 rounded-lg gap-5 justify-center">
        <span className="flex flex-col">
          <span className="text-lg font-bold">Katalog Adı:</span>
          <span>{catalog.name}</span>
        </span>
        <span className="flex flex-col">
          <span className="text-lg font-bold">İçerik:</span>
          <span>{catalog.content}</span>
        </span>
      </div>
      <div className=" flex items-center justify-center w-full col-span-2 ">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Hemen İncele
        </button>
      </div>
    </div>
  );
}
export default CatalogItem;
