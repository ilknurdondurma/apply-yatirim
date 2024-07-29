import React, { useEffect, useState } from "react";
import { FaAnglesRight } from "react-icons/fa6";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {GetAbouts} from "../../redux/actions/about/aboutActions"
function About() {
  const dispatch=useDispatch();
  const {abouts , loading ,error}= useSelector((state)=>state.about);

  useEffect(()=>{
    dispatch(GetAbouts());
  },[dispatch]);

 if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;


  return (
    <div>
      <div className="w-full mx-auto p-5">
        {abouts.map((item, index) => (
          <div className="grid grid-cols-5 gap-20">
            <div key={item.id} className={`col-span-4  p-5 rounded-lg h-auto `}>
              <h2 className="text-xl my-5 mx-6 flex gap-2">
                <FaAnglesRight />
                {item.title}
              </h2>

              <div className={`border-l-2 p-5 rounded-lg h-auto`}>
                <p > {item.description}</p>
              </div>
            </div>

            <div>
              <h2 className="py-2">
                   Önerilen : 
                </h2>
                {item.videoUrl ? (
                    <div>
                      <ReactPlayer url={item.videoUrl} controls width="100%" height="50%"/>
                    </div>
                  ):(
                    <div>Video Bulunamadı</div>
                  )}
            </div>
          </div>
        ))}

        
      </div>
    </div>
  );
}

export default About;
