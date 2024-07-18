import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SiD3Dotjs } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";
import { MdChevronRight } from "react-icons/md";
import { navbarElements } from "../dummy-data/navbarElements";
function Sidebar() {
  //   const sidebarElements = [
  //     {
  //       id: 1,
  //       title: "Products",
  //       icon: <FaBookOpenReader size="20px" color="black" />,
  //       route: "admin/products",
  //     },
  //     {
  //       id: 2,
  //       title: "Katalog",
  //       icon: <FaBookOpenReader size="20px" color="black" />,
  //       route: "admin/catalog",
  //     },
  //     {
  //       id: 3,
  //       title: "İletişim",
  //       icon: <BiSolidBookAdd size="20px" color="black" />,
  //       route: "admin/contact",
  //     },
  //   ];

  const [sidebarElements, setSidebarElements] = useState(navbarElements);
  const [active, setActive] = useState();
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = sidebarElements.findIndex(
      (element) => element.path === currentPath
    );
    setActive(activeIndex);
  }, [location.pathname, sidebarElements]);
  return (
    <div className=" fixed w-1/6 md:w-1/4 border-gray-400 bg-slate-100 border-2 my-2 p-1 h-full font-thin">
      <div className="h-full text-xl pt-5  flex flex-col justify-between">
        <div className="self-start items-center justify-center w-full pl-4 lg:pl-2">
          <SiD3Dotjs size={30} />
          {sidebarElements.map((menu, index) => (
            <NavLink key={menu.id} to={`/admin/${menu.path}`}>
              <div
                key={menu.id}
                className={`flex justify-between items-center  m-2 p-2 cursor-pointer hover:bg-primary hover:text-white  rounded-md border-b- ${
                  active === index ? " bg-primary/80 rounded-lg p-2" : ""
                }2`}
              >
                <div className="flex">
                  <div className="mr-2">
                    <RxDashboard />
                  </div>
                  <div>{menu.name}</div>
                </div>
                <MdChevronRight color="black" />
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
