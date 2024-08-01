import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { navbarElements } from "../../dummy-data/navbarElements";
import { AnimateContainer } from "react-animate-container";
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";

import { darkTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";
import { contactData } from "../../dummy-data/contact";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import SearchBar from "../../components/searchBar";
import ToggleSwitch from "../../components/toggle";

function Navigation() {
  const [navbarElement] = useState(navbarElements);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [contacts] = useState(contactData);
  const facebook = contacts[0].facebook;
  const twitter = contacts[0].twitter;
  const instagram = contacts[0].instagram;
  const youtube = contacts[0].youtube;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const theme = useSelector((state) => state.theme.theme);
 
  return (
    <div className={`grid grid-cols-3 sm:grid-cols-4 items-center  fixed top-0 z-10 p-3 w-full rounded-xl border-b-[1px] border-slate-300`} style={theme }>


      <div className="col-span-2 md:col-span-1 sm:col-span-2 flex flex-col justify-center items-center">

          <div className="flex flex-row justify-between items-center gap-5 sm:hidden md:hidden">
            {navbarElement.map((element, index) => (
              element.key==="duo" ? (
                <NavLink
                to={`${element.path}`}
                key={index}
                className={({ isActive }) =>
                  `flex gap-2 items-center justify-center hover:text-primary m-2 p-2  ${isActive ? " bg-primary/80 rounded-lg p-2 text-white" : ""}`
                }
              >
                {element.icon}
                {element.name}
              </NavLink>
              ) : (null)
            ))}
            
          </div>

          <span className="self-start px-5 py-3 hidden sm:flex md:flex gap-2 items-center sm:justify-between md:justify-between">
            <GiHamburgerMenu color={theme === lightTheme ? "black" : "white"} size={20} onClick={toggleSidebar} /> Menü
            <NavLink to={"/login"} className="flex justify-center items-center">
              <FaUser size={15} className="cursor-pointer m-2" /> Giriş Yap
            </NavLink>
          </span>

          <div className={`hidden sm:block md:block z-10 w-full h-auto`}>
            {isSidebarOpen &&
              navbarElement.map((menu, index) => (
                <NavLink
                  key={index}
                  to={`${menu.path}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <div
                    key={index}
                    className="flex m-2 p-2 cursor-pointer"
                  >
                    {menu.name}
                  </div>
                </NavLink>
              ))}
          </div>

      </div>


      <div className="col-span-1 md:col-span-2 sm:col-span-2 flex justify-between sm:justify-end items-center">
        <div className="flex">
            <SearchBar placeholder="Search..." />
            <NavLink to={"/login"} className="sm:hidden md:hidden flex items-center">
              <FaUser size={20} className="cursor-pointer m-2" />
              <span className="md:hidden">Giriş Yap</span>
            </NavLink>
              <ToggleSwitch />
        </div>
        <div className="flex gap-2 self-center mx-2 sm:hidden">
             
              <a href={facebook}>
                <FaFacebook size={15} />
              </a>
              <a href={twitter}>
                <FaTwitter size={15} />
              </a>
              <a href={instagram}>
                <FaInstagram size={15} />
              </a>
              <a href={youtube}>
                <AiFillYoutube size={15} />
              </a>
            </div>
        
      </div>
      
    </div>
  );
}


export default Navigation;
/**
 import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { navbarElements } from "../../dummy-data/navbarElements";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";

import { contactData } from "../../dummy-data/contact";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";

function Navigation() {
  const [navbarElement] = useState(navbarElements);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [contacts] = useState(contactData);
  const facebook = contacts[0].facebook;
  const twitter = contacts[0].twitter;
  const instagram = contacts[0].instagram;
  const youtube = contacts[0].youtube;
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const theme = useSelector((state) => state.theme.theme);
 
  return (
    <div className={`grid grid-cols-3 items-center  fixed top-0 z-10 p-2 w-full rounded-xl`} style={theme === lightTheme ? darkTheme : lightTheme}>


      <div className="col-span-2 flex flex-col justify-center items-center">

          <div className="flex flex-row justify-between items-center gap-5 sm:hidden">
            {navbarElement.map((element, index) => (
              <NavLink
                to={`${element.path}`}
                key={index}
                className={({ isActive }) =>
                  `flex gap-2 items-center justify-center hover:text-primary m-2 p-2  ${isActive ? " bg-primary/80 rounded-lg p-2 text-white" : ""}`
                }
              >
                {element.icon}
                {element.name}
              </NavLink>
            ))}
            
          </div>

          <span className="self-center sm:self-start sm:px-5 sm:py-3 hidden sm:flex sm:gap-2 items-center sm:justify-between">
            <GiHamburgerMenu color="black" size={20} onClick={toggleSidebar} /> Menü
            <NavLink to={"/login"} className="flex justify-center items-center">
              <FaUser size={15} className="cursor-pointer m-2" /> Giriş Yap
            </NavLink>
          </span>

          <div className={`hidden sm:block z-10 w-full h-auto`}>
            {isSidebarOpen &&
              navbarElement.map((menu, index) => (
                <NavLink
                  key={index}
                  to={`${menu.path}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <div
                    key={index}
                    className="flex m-2 p-2 cursor-pointer"
                  >
                    {menu.name}
                  </div>
                </NavLink>
              ))}
          </div>

      </div>


      <div className="col-span-1 flex justify-between">
          <div className="flex">
              <div className="m-4">
                      <input
                        type="text"
                        placeholder="Sayfada Ara.."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="text-black p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
              <NavLink to={"/login"} className="sm:hidden flex items-center">
                <FaUser size={20} className="cursor-pointer m-2" />
                <span className="md:hidden">Giriş Yap</span>
              </NavLink>
          </div>
          <div className="flex gap-2 self-center mx-2">
              <a href={facebook}>
                <FaFacebook size={15} />
              </a>
              <a href={twitter}>
                <FaTwitter size={15} />
              </a>
              <a href={instagram}>
                <FaInstagram size={15} />
              </a>
              <a href={youtube}>
                <AiFillYoutube size={15} />
              </a>
            </div>
      </div>
      
    </div>
  );
}


export default Navigation;

 */