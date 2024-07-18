import React, { useState } from "react";
import { SiD3Dotjs } from "react-icons/si";
import { FaEnvelope, FaWhatsapp, FaPhone } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import backgroundImage from "../assets/backgroundImage.jpg";
import logo from "../assets/logo.jpg";
import { contactData } from "../dummy-data/contact";
import { AnimateContainer } from "react-animate-container";

function Navbar() {
  const [contacts, setContacts] = useState(contactData);
  const mail = `mailto:${contacts[0].email}`;
  const phone = `tel:${contacts[0].phone}`;
  const whatsapp = `https://wa.me/${contacts[0].phone}`;
  const location = useLocation();

  return (
    <div
      className={`h-auto flex flex-col justify-center bg-slate-50 md:mt-28 sm:mt-28 mt-20 border-b-2 ${
        location.pathname !== "/login" ? "block" : " hidden"
      }  `}
      style={{
        //backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "250px",
        //200  // 150
        height: "300px",
      }}
    >
      <div>
        <div className="flex flex-row ">
          <div className="h-auto grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 justify-between sm:flex-col   mx-auto gap-10 md:gap-5 sm:gap-3">
            <div className="col-span-1 flex items-center justify-center ml-2">
              <SiD3Dotjs size={75} className="m-5" />
              <div className="flex flex-col">
                <AnimateContainer.fadeInLeft duration={0.1} active>
                  <div className="text-2xl sm:text-lg md:text-xl px-5 ">
                    {contacts[0]["name"]}
                  </div>
                </AnimateContainer.fadeInLeft>
                <AnimateContainer.fadeInLeft duration={0.1} active>
                  <div className="text-base sm:text-sm md:text-sm px-5 ">
                    {contacts[0]["subTitle"]}
                  </div>
                </AnimateContainer.fadeInLeft>
              </div>
            </div>

            <div className="col-span-1 flex gap-5 justify-start px-5 items-center border-2 rounded-xl shadow-md bg-slate-50">
              <div>
                <FaPhone size={30} />
              </div>
              <div className="flex flex-col gap-2 text-base">
                <a href={phone}>
                  <span className="font-bold">Tel 1: </span>
                  {contacts[0]["phone"]}
                </a>
                <a href={phone}>
                  <span className="font-bold">Tel 2: </span>
                  {contacts[0]["phone"]}
                </a>
              </div>
            </div>

            <div className="col-span-1 flex gap-5 justify-start px-5 items-center border-2 rounded-xl shadow-md bg-slate-50">
              <div>
                <FaEnvelope size={30} />
              </div>
              <div className="flex flex-col gap-2 text-base">
                <a href={mail}>
                  <span className="font-bold">Mail 1: </span>
                  {contacts[0]["email"]}
                </a>
                <a href={mail}>
                  <span className="font-bold">Mail 2: </span>
                  {contacts[0]["email"]}
                </a>
              </div>
            </div>

            <div className="sm:hidden col-span-1 flex items-center justify-center m-5 sm:m-2 ">
              <AnimateContainer.fadeInRight duration={1} active>
                <a
                  href={whatsapp}
                  className=" hover:text-gray-100 text-white flex flex-col items-center justify-center gap-1 mx-5 border-2 p-2 px-5 rounded-xl bg-green-400"
                >
                  <div className="flex gap-3">
                    <FaWhatsapp size={35} color="white" className="sm:hidden" />
                    <span className="text-xl md:text-sm sm:text-sm">
                      WhatsApp
                    </span>
                  </div>
                  <span className="text-xl md:text-sm sm:hidden">
                    ile iletişim kur
                  </span>
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
/**

 */
/**
 
 */
