import React from "react";
import book from "../../assets/book.jpg";
import { useSelector } from "react-redux";
import { lightTheme, grayLightTheme, grayDarkTheme } from "../../redux/reducers/theme/themeReducers";
import { downloadCatalog } from "../../api";
import { FaArrowAltCircleDown } from "react-icons/fa";

function CatalogItem({ catalog }) {
  const theme = useSelector((state) => state.theme.theme);
  

  const handleDownload = async (id, fileName) => {
    try {
      alert(`"${catalog.title}" kataloğu indiriliyor...`);
      const response = await downloadCatalog(id);
      const blob = await response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Dosya indirilirken bir hata oluştu", error);
    }
  };

  const appliedTheme = theme === lightTheme ? grayLightTheme : grayDarkTheme;

  return (
    <div className="w-full grid p-5 rounded-3xl" style={appliedTheme}>
        <div className={`grid grid-cols-5 sm:grid-cols-1 justify-between items-center  rounded-lg mx-auto`} >
            <div className="col-span-1 flex items-center justify-center mb-4 rounded-full">
              <img
                src={book}
                alt={catalog.title}
                className="w-full h-full object-contain rounded-full border-2 border-white"
              />
            </div>

            <div className="col-span-4 flex flex-col p-5 rounded-lg gap-5 justify-center ">
              <span className="flex flex-col">
                <span className="font-bold line-clamp-2">{catalog.title}</span>
              </span>
              <span className="flex flex-col">
                <span className="line-clamp-5">{catalog.description}</span>
              </span>
            </div>
        </div>


        <div className=" flex items-center justify-center w-full col-span-2 ">
        <button
          onClick={() => handleDownload(catalog.id,catalog.fileName)}
          className="px-4 py-2 bg-primary text-white rounded-lg flex justify-center items-center gap-2"
        >
          Hemen İncele  <FaArrowAltCircleDown />
        </button>
        </div>
    </div>
  );
}
export default CatalogItem;
