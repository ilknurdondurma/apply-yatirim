import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { contactData } from "../../dummy-data/contact";
import { navbarElements } from "../../dummy-data/navbarElements";
import DynamicForm from "../../components/form";
import { messageSchema } from "../../validations/messageMe";
import { fieldsMessage } from "../../formFields/messageMe";
import { useSelector } from "react-redux";

function Footer() {
  const formField = fieldsMessage;
  const validationSchema = messageSchema;
  const [contacts] = useState(contactData);
  const [navbarElement] = useState(navbarElements);
  const facebook = contacts[0].facebook;
  const twitter = contacts[0].twitter;
  const instagram = contacts[0].instagram;
  const youtube = contacts[0].youtube;
  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    alert("Form submitted successfully!");
  };
  const theme = useSelector((state) => state.theme.theme);


  return (
    <footer className={`grid grid-cols-2 sm:grid-cols-1 p-10 `}style={theme}>
      <div className="flex flex-col justify-center items-center gap-5">
          <div className="w-full">
                <h3 className="text-2xl font-bold mb-2">İletişim Bilgileri</h3>
                <div className="flex items-center mb-4 ">
                  <FaPhone className=" mr-2" />
                  <span className="">{contacts[0].phone}</span>
                </div>
                <div className="flex items-center mb-4">
                  <FaEnvelope className="mr-2" />
                  <span className="">{contacts[0].email}</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className=" mr-2" />
                  <span className="">{contacts[0].address}</span>
                </div>
          </div>
          <div className="w-full">
                <h3 className="text-2xl font-bold mb-2">Önemli Bağlantılar</h3>
                <ul className="mb-4">
                  {navbarElement.map((element, index) => (
                    <li key={index} className="mt-2">
                      <NavLink
                        to={element.path}
                        className="  transition duration-300"
                      >
                        {element.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                
          </div>
          <div className="w-full">
              <h3 className="text-2xl font-bold  mb-2">Sosyal Medya Hesapları</h3>
                <div className="flex mb-4">
                  <a
                    href={facebook}
                    className="  transition duration-300 mr-4"
                    aria-label="Facebook"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href={twitter}
                    className=" transition duration-300 mr-4"
                    aria-label="Twitter"
                  >
                    <FaTwitter size={24} />
                  </a>
                  <a
                    href={instagram}
                    className=" transition duration-300 mr-4"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href={youtube}
                    className=" transition duration-300"
                    aria-label="YouTube"
                  >
                    <AiFillYoutube size={24} />
                  </a>
                </div>
          </div>
      </div>
      <div className="flex justify-center items-center">
        <DynamicForm
          fields={formField}
          header="Bize Ulaşın"
          onSubmit={handleSubmit}
          validationsSchema={validationSchema}
        />
      </div>
    </footer>
  );
}

export default Footer;
