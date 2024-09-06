import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { lightTheme, grayDarkTheme, grayLightTheme } from "../../redux/reducers/theme/themeReducers";

export default function DetailCard({ products: product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (direction) => {
    const images = [product?.imageUrl1, product?.imageUrl2, product?.imageUrl3].filter(resim => resim != null);
    
    if (images.length === 0) {
      // No valid images to display
      return;
    }

    if (direction === 'left') {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    } else if (direction === 'right') {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const theme = useSelector((state) => state.theme.theme);
  const tema = { backgroundColor: "white" };
  const imageUrlKey = `imageUrl${currentImageIndex + 1}`;
  const imageUrl = product[imageUrlKey];

  // Set default values for properties and compatibleModels if they are undefined
  const properties = product?.properties || [];
  const compatibleModels = product?.compatibleModels || [];

  return (
    <div>
      <div className="mx-auto my-10 p-5 w-4/5 sm:w-full items-center justify-center">

        {/* kategori */}
        <div className='mb-10 flex items-center gap-2'>
          Ürünler <FaChevronRight />
          {product?.category?.title ? (
            <>
              {product.category.title} <FaChevronRight /> {product.title}
            </>
          ) : (
            "Kategori Bulunamadı"
          )}
        </div>

        {/* fotograf ve isim */}
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-1 shadow-lg rounded-lg p-5" style={theme === lightTheme ? grayLightTheme : grayDarkTheme}>
          <div className='col-span-1 grid grid-cols-11 m-2'>
            <span className='flex justify-center self-center'><FaChevronLeft onClick={() => handleImageChange('left')} /></span>
            <div className="col-span-9 flex justify-center items-center">
              <img className="object-contain h-96 w-96" src={`data:image/jpeg;base64,${imageUrl}`} alt='ürün'/>
            </div>
            <span className='flex justify-center self-center'><FaChevronRight onClick={() => handleImageChange('right')} /></span>
          </div>
          <div className="col-span-2 p-6 flex flex-col justify-between m-2 rounded-lg" style={theme === lightTheme ? tema : grayDarkTheme}>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="mb-4">{product.description}</p>
              <div className="mb-2">
                <span className='font-bold'>Kategori: </span>
                {product?.category?.title ? (
                  <span>{product.category.title}</span>
                ) : (
                  "Kategori Bulunamadı"
                )}
              </div>
            </div>
            <div>
              <div className="text-lg mb-2">Stok Durumu: {product.stock}</div>
              <div className="text-lg text-primary font-semibold mb-2">Fiyat: ${product.price}</div>
              <NavLink to={"/iletisim"}>
                <button className="px-4 py-2 w-full bg-primary text-white rounded-lg">
                  İletişime Geç
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* tablo - özellikler */}
        {properties.length > 0 ? (
          <div className="overflow-x-auto my-10 ">
            <h1 className='text-xl font-bold'>Ürün Özellikleri</h1>
            <table className="min-w-full border-collapse border border-gray-300" style={theme}>
              <thead style={theme === lightTheme ? grayLightTheme : grayDarkTheme}>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Özellik</th>
                  <th className="border border-gray-300 px-4 py-2">Değer</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(prop => (
                  <tr key={prop.id} className="hover:bg-gray-400">
                    <td className="border px-4 py-2">{prop.propertyType.title}</td>
                    <td className="border px-4 py-2">{prop.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {/* tablo - uyumlu modeller */}
        {compatibleModels.length > 0 ? (
          <div className="overflow-x-auto my-10 ">
            <h1 className='text-xl font-bold'>Uyumlu Modeller</h1>
            <table className="min-w-full border-collapse border border-gray-300" style={theme}>
              <thead style={theme === lightTheme ? grayLightTheme : grayDarkTheme}>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Marka</th>
                  <th className="border border-gray-300 px-4 py-2">Model</th>
                </tr>
              </thead>
              <tbody>
                {compatibleModels.map(cm => (
                  <tr key={cm.id} className="hover:bg-gray-400">
                    <td className="border px-4 py-2">{cm.model.brand.title}</td>
                    <td className="border px-4 py-2">{cm.model.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

      </div>
    </div>
  );
}
