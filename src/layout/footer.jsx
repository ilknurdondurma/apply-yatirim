import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { contactData } from "../dummy-data/contact";
import { navbarElements } from "../dummy-data/navbarElements";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Burada formun gönderimi işlemleri yapılabilir
    console.log("Form submitted with data:", formData);
    // Örneğin, form verilerini bir API'ye POST etmek gibi işlemler yapılabilir
    // Axios, fetch veya diğer HTTP kütüphaneleri kullanılabilir
    // Örnek axios.post('/api/contact', formData);
    // veya fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
    // gibi işlemler gerçekleştirilebilir.
    // Bu örnekte sadece konsola logladık.
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
                <FaMapMarkerAlt className="text-gray-500 mr-2 w-full" />
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
          <form onSubmit={handleSubmit} className="mt-4 sm:hidden">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white p-2"> Bize Ulaşın</h1>
              <input
                type="text"
                name="name"
                placeholder="Adınız"
                value={formData.name}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                name="email"
                placeholder="E-posta Adresiniz"
                value={formData.email}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                name="message"
                placeholder="Mesajınız"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
