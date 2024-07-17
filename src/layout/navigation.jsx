import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useLocation } from "react-router-dom";
import { navbarElements } from "../dummy-data/navbarElements";
import { AnimateContainer } from "react-animate-container";
import { FaEnvelope, FaWhatsapp, FaPhone } from "react-icons/fa";

function Navigation() {
  const [active, setActive] = useState();
  const [navbarElement, setNavbarElement] = useState(navbarElements);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = navbarElement.findIndex(
      (element) => element.path === currentPath
    );
    setActive(activeIndex);
  }, [location.pathname, navbarElement]);

  return (
    <div className="flex flex-row justify-center  bg-black fixed top-0 z-10 py-2 w-full text-slate-50">
      <div className="flex flex-col justify-center  sm:w-full">
        <div className="flex flex-row justify-around gap-5 sm:hidden">
          {navbarElement.map((element, index) => {
            return (
              <NavLink to={`${element.path}`} key={index}>
                <div
                  key={index}
                  className={`${responsiveClass} ${hover} m-2 p-2 text-md italic font bold  ${
                    element.path === "/propose"
                      ? "border-2 border-black border-dotted bg-primary/40"
                      : "border-2 border-transparent"
                  } ${active === index ? " bg-primary/80 rounded-lg p-2" : ""}`}
                  onClick={() => setActive(index)}
                >
                  {element.name}
                </div>
              </NavLink>
            );
          })}
          <div className="m-4">
            <input
              type="text"
              placeholder="Sayfada Ara.."
              value={searchTerm}
              onChange={handleSearchChange}
              className="text-black p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <span
          className="self-center sm:self-start sm:px-5 sm:py-3 hidden sm:flex sm:gap-2  sm:font-bold"
          onClick={toggleSidebar}
        >
          <GiHamburgerMenu color="white" size="30px" /> Menü
        </span>
        <div className="hidden sm:block bg-primary z-10 w-full h-auto">
          {isSidebarOpen &&
            navbarElement.map((menu, index) => (
              <NavLink
                key={index}
                to={`${menu.path}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div
                  key={index}
                  className="flex m-2 p-2 cursor-pointer text-white hover:font-bold"
                >
                  {menu.name}
                </div>
              </NavLink>
            ))}
        </div>
        <div className="hidden sm:block ">
          <AnimateContainer.fadeInRight duration={1} active>
            <a
              href={""}
              className=" hover:text-gray-100 text-white flex flex-col items-center justify-center gap-1 mx-5 border-2 p-2 px-5 rounded-xl bg-green-400"
            >
              <div className="flex gap-3">
                <FaWhatsapp size={35} color="white" className="sm:hidden" />
                <span className="text-xl md:text-sm sm:text-sm">WhatsApp</span>
              </div>
              <span className="text-xl md:text-sm sm:hidden">
                ile iletişim kur
              </span>
            </a>
          </AnimateContainer.fadeInRight>
        </div>
      </div>
    </div>
  );
}

const responsiveClass = "md:text-xs sm:text-sm lg:text-xl gap-2 ";
const hover = "hover:text-primary  rounded-lg";

export default Navigation;
