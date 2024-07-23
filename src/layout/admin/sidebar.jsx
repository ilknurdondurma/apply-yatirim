import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-dark.png";
import user from "../../assets/user.jpg";
import { MdChevronRight, MdMenu, MdClose } from "react-icons/md";
import { LuPanelLeftClose, LuPanelLeftOpen,LuDot } from "react-icons/lu";
import { navbarElements } from "../../dummy-data/navbarElements";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../redux/reducers/theme/themeReducers";
import SearchBar from "../../components/searchBar";
import { useAuth } from "../../context/authContext/authContext";
function Sidebar() {
  const [sidebarElements, setSidebarElements] = useState(navbarElements);
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState(1);
  const { setUser } = useAuth();
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

  const handleMenuClick = (menuId) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId);
  };

  const handleClick = () => {};

  return (
    <div
      className={`flex flex-col h-full border-r-[1px] border-gray-400 ${
        isOpen ? "w-64" : "w-20"
      }`}
      style={theme}
    >
      <section>
        <div className="flex flex-col justify-between items-center p-4">
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none self-end"
          >
            {isOpen ? (
              <LuPanelLeftClose
                size={24}
                color={theme === lightTheme ? "#8b0000" : "#8b0000"}
              />
            ) : (
              <LuPanelLeftOpen
                size={24}
                color={theme === lightTheme ? "#8b0000" : "#8b0000"}
              />
            )}
          </button>
          <img
            src={theme === lightTheme ? logoDark : logo}
            alt="logo"
            className={`h-16 w-auto ${isOpen ? "block" : "hidden"}`}
            onClick={handleClick}
          />
        </div>
      </section>

      <section>
        <div className="flex flex-col justify-center items-center">
          <img
            src={user}
            alt="admin"
            className="rounded-full w-1/2 h-1/2 self-center"
          />
          <span className={`${isOpen ? "" : "hidden"}`}>AHMET YILMAZ</span>
          <span className={`text-gray-400 ${isOpen ? "" : "hidden"}`}>
            ayilmaz@gmail.com
          </span>
          <SearchBar placeholder="Search..." />
        </div>
      </section>

      <section>
        <div className={`flex flex-col transition-all duration-300`}>
          {sidebarElements.map((menu) => (
            <div key={menu.id} className="flex flex-col">
              <div
                onClick={() => handleMenuClick(menu.id)}
                className={`flex justify-between items-center m-2 p-2 cursor-pointer rounded-md `}
              >
                <div className="flex items-center">
                  <div className="mr-2">{menu.icon}</div>
                  <div className={`${isOpen ? "block" : "hidden"}`}>
                    {menu.name}
                  </div>
                </div>
                {menu.submenus.length > 0 && (
                  <MdChevronRight
                    className={`${isOpen ? "block" : "hidden"} ${
                      expandedMenu === menu.id ? "transform rotate-90" : ""
                    }`}
                    color={theme === lightTheme ? "black" : "white"}
                  />
                )}
              </div>
              {menu.submenus.length > 0 && expandedMenu === menu.id && (
                <div className={`flex flex-col ${isOpen ? "block" : "hidden"} ml-10 `}>
                  {menu.submenus.map((submenu) => (
                    <NavLink
                      key={submenu.id}
                      to={`/admin/${submenu.path}`}
                      className={({ isActive }) =>
                        `flex items-center m-1 p-1 cursor-pointer rounded-md ${
                          isActive &&
                          location.pathname === `/admin/${submenu.path}`
                            ? "bg-primary text-white rounded-lg p-2"
                            : ""
                        }`
                      }
                    >
                      <span className={`flex text-slate-500 ${isOpen ? "block" : "hidden"}`}>
                          <LuDot size={25} /> {submenu.name}
                      </span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
