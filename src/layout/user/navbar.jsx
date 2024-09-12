import React, { useEffect, useState } from "react";
import { FaEnvelope, FaWhatsapp, FaPhone } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-dark.png";
import { AnimateContainer } from "react-animate-container";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";
import {GetContacts} from "../../redux/actions/contact/contactActions"
function Navbar() {
  
  const dispatch=useDispatch();
  const {contacts ,loading,error} =useSelector((state)=>state.contact);
  const theme = useSelector((state) => state.theme.theme);
  useEffect(()=>{
    dispatch(GetContacts());
  },[useDispatch]);

  const mail = contacts.length > 0 ? `mailto:${contacts[0].email}` : "#";
  const phone = contacts.length > 0 ? `tel:${contacts[0].phone}` : "#";
  const whatsapp = contacts.length > 0 ? `https://wa.me/${contacts[0].phone}` : "#";
  const location = useLocation();

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;
  

  return (
    <div
      className={`h-auto flex flex-col justify-center mt-16 md:mt-20 sm:mt-28 sm:p-10  rounded-xl ${
        location.pathname !== "/" ? "hidden" : "block"
      }`}
      style={{
        ...theme,
        //backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "300px",
        height: "350px",
      }}
      
    >
      
      <div>
        <div className="flex flex-row">
          <div className="h-auto grid grid-cols-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-evenly sm:flex-col mx-auto md:gap-5 sm:gap-3">
            <div className="col-span-3 sm:col-span-1 flex items-center justify-center m-1">
              <img src={theme === darkTheme ?  logo : logoDark} alt="logo" style={{ height: '70px', width: 'auto' }} />
             
                {contacts.map((contact)=>(
                  <div className="flex flex-col">
                    <AnimateContainer.fadeInLeft duration={0.1} active>
                      <div className="text-2xl sm:text-base  px-5">
                        {contact.title}
                      </div>
                  </AnimateContainer.fadeInLeft>
                  <AnimateContainer.fadeInLeft duration={0.1} active>
                    <div className="text-xl sm:text-sm  px-5">
                      {contact.subTitle}
                    </div>
                  </AnimateContainer.fadeInLeft>
                  </div>
                ))}
              
            </div>
   
            <div className={`col-span-1 flex gap-5 justify-start px-5 m-1 items-center border-2 rounded-xl shadow-md h-full `} style={theme === lightTheme ? darkTheme : lightTheme}>
              <div>
                <FaPhone size={30} />
              </div>
                  {
                    contacts.map((contact)=>(
                      <div className="flex flex-col gap-2">
                      <a href={phone}>
                        <span className="font-bold">Tel 1: </span>
                        {contact.phone}
                      </a>
                      <a href={phone}>
                        <span className="font-bold">Tel 2: </span>
                        {contact.phone2}
                      </a>
                    </div>
                    ))
                  }
            </div>

            <div className={`col-span-1 flex gap-3 justify-start px-5 m-1 items-center border-2 rounded-xl shadow-md h-full `}style={theme === lightTheme ? darkTheme : lightTheme}>
              <div>
                <FaEnvelope size={28} />
              </div>
              {
                contacts.map((contact)=>(
                  <div className="flex flex-col gap-2">
                    <a href={mail} >
                      <span className="font-bold">Mail 1: </span>
                      {contact.email}
                    </a>
                    <a href={mail} >
                      <span className="font-bold">Mail 2: </span>
                      {contact.email2} 
                    </a>
              </div>
                ))
              }
            </div>

            <div className={`col-span-1 flex gap-5 justify-start px-5 m-1  items-center border-2 rounded-xl shadow-md h-full bg-green-400`}>
              <AnimateContainer.fadeInRight duration={1} active>
                <a href={whatsapp} className="flex sm:flex-row items-center justify-center rounded-xl gap-3 ">
                  <div >
                    <FaWhatsapp size={35} color="white" className="" />
                  </div>
                  <div className="flex flex-col gap-2 text-white">
                    <span className="font-semibold text-xl">
                        WhatsApp
                      </span>
                    <span className="">
                      ile iletişim kur
                    </span>
                  </div>
                </a>
              </AnimateContainer.fadeInRight>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Navbar;
