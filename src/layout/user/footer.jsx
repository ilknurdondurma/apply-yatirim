import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { navbarElements } from "../../dummy-data/navbarElements";
import DynamicForm from "../../components/form";
import { messageSchema } from "../../validations/messageMe";
import { fieldsMessage } from "../../form-fields/messageMe";
import { useDispatch, useSelector } from "react-redux";
import { GetContacts } from "../../redux/actions/contact/contactActions";
import { grayDarkTheme, grayLightTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";

function Footer() {
  const dispatch=useDispatch();
  const {contacts ,loading,error} =useSelector((state)=>state.contact);
  const theme = useSelector((state) => state.theme.theme);
  const formField = fieldsMessage;
  const validationSchema = messageSchema;
  const [navbarElement] = useState(navbarElements);
  const facebook = contacts.length > 0 ?  contacts[0].facebook : "";
  const twitter = contacts.length > 0 ?  contacts[0].twitter : "";
  const instagram = contacts.length > 0 ?   contacts[0].instagram : "";
  const youtube = contacts.length > 0 ?   contacts[0].youtube : "";
  const mail = contacts.length > 0 ? `mailto:${contacts[0].email}` : "#";
  const phone = contacts.length > 0 ? `tel:${contacts[0].phone}` : "#";
  const location = contacts.length > 0 ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contacts[0].address)}` : "#";


  useEffect(()=>{
    dispatch(GetContacts());
  },[useDispatch]);

  
  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    alert("Form submitted successfully!");
  };
 
  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;
  

  return (
    <footer className={`grid grid-cols-2 sm:grid-cols-1 p-10 border-t-2`}style={theme===lightTheme ? grayDarkTheme : null}>
      <div className="flex flex-col justify-center items-center gap-5">
          {contacts.map((contact)=>(
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-2">İletişim Bilgileri</h3>
              <div className="flex items-center mb-4 ">
                <FaPhone className=" mr-2" />
                <a href={phone}>
                  <span className="font-bold">Tel 1: </span>
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="mr-2" />
                <a href={mail}>
                <span className="font-bold">Mail 1: </span>
                {contact.email}
                </a>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className=" mr-2" />
                <a href={location}>
                <span className="font-bold">Adres: </span>
                {contact.address}
                </a>
              </div>
        </div>
          ))}
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
