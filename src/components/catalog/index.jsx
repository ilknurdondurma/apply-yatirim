import React from "react";
import book from "../../assets/book.jpg";

function CatalogItem({ catalog }) {
  const handleDownload = () => {
    alert(`"${catalog.name}" kataloğu indiriliyor...`);
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-1 justify-between items-center border-2 m-5 p-5 rounded-lg shadow-xl mx-auto">
      <div className="p-10 flex items-center justify-center mb-4 sm:hidden">
        <img
          src={book}
          alt={catalog.name}
          className=" object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col text-black ">
        <span className="gap-2">
          <span className="text-xl font-bold">Katalog Adı:</span>
          <span className="text-lg italic">{catalog.name}</span>
        </span>
        <span className="gap-2">
          <span className="text-xl font-bold">İçerik:</span>
          <span className="text-lg italic">{catalog.content}</span>
        </span>
      </div>
      <div className="flex items-center justify-center sm:hidden">
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
