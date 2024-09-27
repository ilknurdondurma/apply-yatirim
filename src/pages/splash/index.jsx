import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetSectors } from '../../redux/actions/sector/sectorActions';
import backgroundImage from '../../assets/backgroundImage7.jpg';

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
    <>
    <h1 className="text-3xl font-bold mb-6 pt-6 m-2 text-center">Bir Sektör Seçin</h1>
    <div 
    className=" mx-auto   flex flex-col items-center  min-h-screen"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',

    }}>
      {/* <h1 className="text-5xl font-bold mb-6">Hoşgeldiniz</h1> */}
      <div className="w-3/5 md:w-4/5 sm:w-full grid grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-10 sm:gap-2 m-10 sm:m-1 text-center ">
        {sectors.map((sector) => (
          <div 
          className='grid grid-rows-6 border-2 border-slate-400 p-2 m-2 rounded-md bg-gray-200/90 hover:bg-primary/50 hover:text-white'
          onClick={() => setCookie("sectorId" ,sector.id , 1)}>
            <div
            key={sector.id}
            className="row-span-5 flex justify-center items-center p-4 m-2 border border-gray-300 rounded-lg shadow-md cursor-pointer hover:shadow-2xl"
            style={{
              backgroundImage: `url(data:image/jpeg;base64,${sector.imageUrl1 || sector.imageUrl2 || ""})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              //minHeight: '150px', // Adjust the height as necessary
            }}
          >
             </div>
            <span className="text-xl font-medium text-center ">{sector.title}</span>
            <span className="text-sm text-center line-clamp-1">{sector.description}</span>

          </div>
          
        ))}
       
      </div>
    </div>
    </>
  );
};

export default SplashPage;
