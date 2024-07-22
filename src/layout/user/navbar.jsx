import React, { useState } from "react";
import { FaEnvelope, FaWhatsapp, FaPhone } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-dark.png";
import { contactData } from "../../dummy-data/contact";
import { AnimateContainer } from "react-animate-container";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";
import backgroundImage from '../../assets/backgroundImage.jpg'
function Navbar() {
  const [contacts] = useState(contactData);
  const mail = `mailto:${contacts[0].email}`;
  const phone = `tel:${contacts[0].phone}`;
  const whatsapp = `https://wa.me/${contacts[0].phone}`;
  const location = useLocation();

  
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div
      className={`h-auto flex flex-col justify-center md:mt-28 mt-16 rounded-xl p-5${
        location.pathname !== "/login" ? "block" : " hidden"
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
          <div className="h-auto grid grid-cols-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-between sm:flex-col mx-auto md:gap-5 sm:gap-3">
            <div className="col-span-2 sm:col-span-1 flex items-center justify-center m-1">
              <img src={theme === darkTheme ?  logo : logoDark} alt="logo" style={{ height: '70px', width: 'auto' }} />
              <div className="flex flex-col">
                <AnimateContainer.fadeInLeft duration={0.1} active>
                  <div className="text-2xl sm:text-xl px-5">
                    {contacts[0].name}
                  </div>
                </AnimateContainer.fadeInLeft>
                <AnimateContainer.fadeInLeft duration={0.1} active>
                  <div className="px-5">
                    {contacts[0].subTitle}
                  </div>
                </AnimateContainer.fadeInLeft>
              </div>
            </div>

            <div className="col-span-1">
            </div>
            
            <div className={`col-span-1 flex gap-5 justify-start px-5 m-1 items-center border-2 rounded-xl shadow-md h-full `} style={theme === lightTheme ? darkTheme : lightTheme}>
              <div>
                <FaPhone size={30} />
              </div>
              <div className="flex flex-col gap-2">
                <a href={phone}>
                  <span className="font-bold">Tel 1: </span>
                  {contacts[0].phone}
                </a>
                <a href={phone}>
                  <span className="font-bold">Tel 2: </span>
                  {contacts[0].phone}
                </a>
              </div>
            </div>

            <div className={`col-span-1 flex gap-5 justify-start px-5 m-1 items-center border-2 rounded-xl shadow-md h-full`}style={theme === lightTheme ? darkTheme : lightTheme}>
              <div>
                <FaEnvelope size={30} />
              </div>
              <div className="flex flex-col gap-2">
                <a href={mail}>
                  <span className="font-bold">Mail 1: </span>
                  {contacts[0].email}
                </a>
                <a href={mail}>
                  <span className="font-bold">Mail 2: </span>
                  {contacts[0].email} 
                </a>
              </div>
            </div>

            <div className={`col-span-1 flex gap-5 justify-start px-5 m-1  items-center border-2 rounded-xl shadow-md h-full bg-green-400`}>
              <AnimateContainer.fadeInRight duration={1} active>
                <a href={whatsapp} className="flex sm:flex-row items-center justify-center rounded-xl gap-3 ">
                  <div >
                    <FaWhatsapp size={35} color="white" className="sm:hidden" />
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
