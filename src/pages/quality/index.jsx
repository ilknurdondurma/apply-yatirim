import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetQualities } from "../../redux/actions/quality/qualityActions";

function Quality() {
  const dispatch=useDispatch();
  const theme=useSelector((state)=>state.theme.theme);
  const {qualities , loading ,error}= useSelector((state)=>state.quality);

  useEffect(()=>{
    dispatch(GetQualities());
  },[dispatch]);

 if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;


  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="mx-auto flex justify-center text-xl">KALİTE</h2>
      <section>
        {qualities.map((section) => (
          <div
            key={section.id}
            className="my-10 p-4 shadow-xl  rounded-lg flex flex-col md:flex-row items-center border-b-[1px] "
            style={theme}
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full md:w-1/2 h-64 object-contain rounded-lg mb-4 md:mb-0 md:mr-4"
            />
            <div className="md:w-1/2 text-center">
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
