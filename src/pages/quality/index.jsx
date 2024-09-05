import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetQualities } from "../../redux/actions/quality/qualityActions";
import { grayDarkTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";

function Quality() {
  const dispatch=useDispatch();
  const theme=useSelector((state)=>state.theme.theme);
  const {qualities , loading ,error}= useSelector((state)=>state.quality);

  useEffect(()=>{
    dispatch(GetQualities());
  },[dispatch]);

  if (loading) return <div className="text-center text-lg font-semibold py-10">Yükleniyor...</div>;

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">{error}</h1>
        <p className="text-xl mt-4 text-gray-600">Bir hata oluştu, lütfen daha sonra tekrar deneyin.</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto" >
      <h2 className="mx-auto flex justify-center text-4xl mt-20  font-bold tracking-wide text-center">
        Kalite Anlayışımızla Her Daim Yanınızdayız.
      </h2>
      <section >
        {qualities.map((section) => (
          <div
            key={section.id}
            className="my-10 p-4 shadow-xl  rounded-lg flex md:flex-row items-center border-b-[1px]  sm:flex sm:flex-col"
            style={theme}
          >
            <img
              src={`data:image/jpeg;base64,${section.imageUrl}`}
              alt={section.title}
              className=" w-1/2 sm:w-full h-64 object-contain rounded-lg mb-4 md:mb-0 md:mr-4"
            />
            <div className="w-1/2 sm:w-full text-center">
              <h2 className="font-bold mb-2">{section.title}</h2>
              <p className="">{section.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Quality;
