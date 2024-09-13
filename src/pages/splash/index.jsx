import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { GetSectors } from '../../redux/actions/sector/sectorActions';

const SplashPage = () => {
  const dispatch = useDispatch();
  const {sectors}= useSelector((state)=>state.sector);
    useEffect(() => {
      dispatch(GetSectors());
    },[dispatch]);

    
 
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
          const date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Expiry date hesapla
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
        window.location.href = '/';
      }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Hoşgeldiniz! Bir Sektör Seçin:</h1>
      <div className="flex flex-wrap gap-4">
        {sectors.map((sector) => (
          <div
            key={sector.id}
            className="p-4 m-2 bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer hover:bg-blue-500 hover:text-white"
            onClick={() => setCookie("sectorId" ,sector.id , 1)}
          >
            {sector.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SplashPage;
