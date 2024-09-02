import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { urunler } from '../../dummy-data/products';
import  Table  from '../../components/table';
import { useSelector } from 'react-redux';
import {lightTheme , grayDarkTheme, grayLightTheme} from "../../redux/reducers/theme/themeReducers"

export default function DetailCard({products}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  //const [products, setProduct] = useState(urunler[7]); // Initialize with the first product

  const handleImageChange = (direction) => {
    const images = [products?.image, products?.filE_URL_2, products?.filE_URL_3].filter(resim => resim != null);
    
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

  const theme=useSelector((state)=>state.theme.theme)
  const tema={backgroundColor:"white"}

  return (
    <div>
      <div className=" mx-auto my-10 p-5 w-4/5 sm:w-full items-center justify-center" >

          {/* kategori */}
           <div className='mb-10 flex items-center gap-2'>
            Ürünler <FaChevronRight />
              {products?.category?.title ? (
                <>
                  {products.category.title} <FaChevronRight /> {products.title}
                </>
              ) : (
                "Kategori Bulunamadı"
              )}
          </div>


          {/* fotograf ve isim */}
          <div className="grid grid-cols-3 sm:grid-cols-1 md.grid-cols-1 shadow-lg rounded-lg p-5" style={theme===lightTheme ? grayLightTheme : grayDarkTheme}>
              <div className='col-span-1 grid grid-cols-11  m-2'>
                  <span className='flex justify-center self-center'><FaChevronLeft onClick={() => handleImageChange('left')} /></span>
                  <div className="col-span-9 flex justify-center items-center">
                      <img className="object-contain h-96 w-auto" src={`${products.imageUrl1}`}/>
                      {/* <img className="object-contain h-96 w-96" src={data:image/jpeg;base64,${product[filE_URL_${currentImageIndex + 1}]}}/> */}
                  </div>
                  <span className='flex justify-center self-center'><FaChevronRight onClick={() => handleImageChange('right')} /></span>
              </div>
            <div className="col-span-2 p-6 flex flex-col justify-between  m-2 rounded-lg" style={theme===lightTheme ? tema : grayDarkTheme}>
              <div>
                <h1 className="text-3xl font-bold mb-4">{products.title}</h1>
                <p className=" mb-4">{products.description}</p>
                <div className=" mb-2">
                 <span className='font-bold'> Kategori: </span> 
                  {products?.category?.title ? (
                    <span>
                      {products.category.title}
                    </span>
                      ) : (
                        "Kategori Bulunamadı"
                      )}
                  </div>
              </div>
              <div>
                <div className="text-lg 0 mb-2">Stok Durumu: {products.stock}</div>
                <div className="text-lg text-primary font-semibold mb-2">Fiyat: ${products.price}</div>
                <NavLink to={"/iletisim"}>
                  <button className={"px-4 py-2 w-full bg-primary text-white rounded-lg" }>
                    İletişime Geç
                  </button>
                </NavLink>
              </div>
            </div>
          </div>

            
           {/* tablo */}
           <div className="overflow-x-auto my-10" >
            {/* Display properties in a table */}
            {
              products.property 
              ? (
              <table className="min-w-full border-collapse border border-gray-300" style={theme}>
                <thead style={theme===lightTheme ? grayLightTheme : grayDarkTheme}>
                  <tr className="">
                    <th className="border border-gray-300 px-4 py-2">Özellik</th>
                    <th className="border border-gray-300 px-4 py-2">Değer</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(products.property).map(([key, value]) => (
                    <tr key={key} className="hover:bg-gray-400">
                      <td className="border px-4 py-2">{key}</td>
                      <td className="border  px-4 py-2">{Array.isArray(value) ? value.join(", ") : value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>) 
              :(
                <table className="min-w-full border-collapse border border-gray-300" style={theme}>
                <thead style={theme===lightTheme ? grayLightTheme : grayDarkTheme}>
                  <tr className="">
                    <th className="border border-gray-300 px-4 py-2">Özellik</th>
                    <th className="border border-gray-300 px-4 py-2">Değer</th>
                  </tr>
                </thead>
                <tbody>
                    <tr  className="hover:bg-gray-400">
                    <td className="border px-4 py-2">Özellik Bulunamadı</td>
                    <td className="border  px-4 py-2">Değer Bulunamadı</td>
                    </tr>
                </tbody>
              </table>)
            }
          </div>
    </div>
    </div>
  )
}
