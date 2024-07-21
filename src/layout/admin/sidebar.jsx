import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-dark.png";
import { MdChevronRight, MdMenu, MdClose } from "react-icons/md";
import { LuPanelLeftClose , LuPanelLeftOpen } from "react-icons/lu";
import { navbarElements } from "../../dummy-data/navbarElements";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";

function Sidebar() {
  const [sidebarElements, setSidebarElements] = useState(navbarElements);
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/");
    }
    setSidebarElements(navbarElements);
  }, [location, navigate]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <div className={`flex flex-col h-full  ${isOpen ? "w-64" : "w-20"}`} style={theme===lightTheme ?darkTheme : lightTheme}>
      <div className="flex justify-between items-center p-4">
        <img src={theme === lightTheme ? logo : logoDark} alt="logo" className={`h-10 w-auto ${isOpen ? "block" : "hidden"}`} />
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isOpen ? < LuPanelLeftClose size={24} color={theme === lightTheme ? "#8b0000" : "#8b0000"}/> : <LuPanelLeftOpen size={24} color={theme === lightTheme ? "#8b0000" : "#8b0000"} />}
        </button>
      </div>
      <div className={`flex flex-col transition-all duration-300 `}>
        {sidebarElements.map((menu) => (
          <NavLink
            key={menu.id}
            to={`/admin/${menu.path}`}
            className={({ isActive }) =>
              `flex justify-between items-center m-2 p-2 cursor-pointer rounded-md ${
                isActive && location.pathname === `/admin/${menu.path}` ? "bg-primary/80 rounded-lg p-2" : ""
              }`
            }
          >
            <div className="flex">
              <div className="mr-2">
                {menu.icon}
              </div>
              <div className={`${isOpen ? "block" : "hidden"}`}>{menu.name}</div>
            </div>
            <MdChevronRight className={`${isOpen ? "block" : "hidden"}`} color={theme === lightTheme ? "white" : "black"} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
