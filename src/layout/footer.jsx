import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { contactData } from "../dummy-data/contact";
import { navbarElements } from "../dummy-data/navbarElements";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import DynamicForm from "../components/form";
import * as Yup from "yup";

function Footer() {
  const formField = [
    {
      name: "name",
      label: "Adınız",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
    },
    { name: "message", label: "Mesajınız", type: "textarea" },
  ];
  const validationSchema = Yup.object({
    name: Yup.string().required("İsim gerekli alan"),
    email: Yup.string()
      .email("Geçersiz email adresi")
      .required("Email gerekli alan"),
    message: Yup.string().required("Mesaj gerekli alan"),
  });

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    alert("Form submitted successfully!");
  };

  const contacts = contactData;
  const navbarElement = navbarElements;

  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-3 sm:grid-cols-1">
          <div className="col-span-2 sm:col-span-1">
            <div className="w-full  ">
              <h3 className="text-2xl font-bold text-white mb-2">
                İletişim Bilgileri
              </h3>
              <div className="flex items-center mb-4">
                <FaPhone className="text-gray-500 mr-2" />
                <span className="text-gray-400 li">{contacts[0].phone}</span>
              </div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-gray-500 mr-2" />
                <span className="text-gray-400">{contacts[0].email}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                <span className="text-gray-400 w-full">
                  {contacts[0].address}
                </span>
              </div>
            </div>
            <div className="w-full   mt-6 ">
              <h3 className="text-2xl font-bold text-white mb-2">
                Önemli Bağlantılar
              </h3>
              <ul className="mb-4">
                {navbarElement.map((element, index) => (
                  <li key={index} className="mt-2">
                    <NavLink
                      to={`${element.path}`}
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      {element.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full   mt-6 ">
              <h3 className="text-2xl font-bold text-white mb-2">
                Sosyal Medya Hesapları
              </h3>
              <div className="flex mb-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300 mr-4"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300 mr-4"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300 mr-4"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <AiFillYoutube size={24} />
                </a>
              </div>
            </div>
          </div>
          <DynamicForm
            fields={formField}
            header="Bize Ulaşın"
            onSubmit={handleSubmit}
            validationsSchema={validationSchema}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
