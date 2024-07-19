import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { navbarElements } from "../../dummy-data/navbarElements";
import { AnimateContainer } from "react-animate-container";
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";


function Navigation() {
  const [navbarElement] = useState(navbarElements);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const theme = useSelector((state) => state.theme.theme);


  return (
    <div className={`grid grid-cols-3 items-center  fixed top-0 z-10 p-2 w-full rounded-xl`} style={theme}>


      <div className="col-span-2 flex flex-col justify-center items-center">

          <div className="flex flex-row justify-between items-center gap-5 sm:hidden">
            {navbarElement.map((element, index) => (
              <NavLink
                to={`${element.path}`}
                key={index}
                className={({ isActive }) =>
                  `hover:text-primary m-2 p-2  ${isActive ? " bg-primary/80 rounded-lg p-2 text-white" : ""}`
                }
              >
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


      <div className="col-span-1 flex">
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
      
    </div>
  );
}


export default Navigation;
