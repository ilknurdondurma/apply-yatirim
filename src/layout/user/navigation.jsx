import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { navbarElements } from "../../dummy-data/navbarElements";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiFillYoutube, AiOutlineProduct } from "react-icons/ai";
import SearchBar from "../../components/searchBar";
import ToggleSwitch from "../../components/toggle";
import { lightTheme } from "../../redux/reducers/theme/themeReducers";
import { GetSectors } from "../../redux/actions/sector/sectorActions";

function Navigation() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [navbarElement] = useState(navbarElements);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { contacts } = useSelector((state) => state.contact);
  const { sectors } = useSelector((state) => state.sector);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Yeni state ekledik

  useEffect(() => {
    dispatch(GetSectors());
    console.log(sectors)
  }, [dispatch])
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Menü açma-kapama işlemi
  };
  const handleChangeSector = async (id) => {
    try {
      // Cookie'yi ayarla
      await setCookie("sectorId", id, 1);
      
      // Sayfayı yenile
      window.location.reload();
    } catch (error) {
      console.error('Hata:', error);
    }
  };
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Expiry date hesapla
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div
      className={`grid grid-cols-3 sm:grid-cols-4 items-center fixed top-0 z-10 p-3 w-full rounded-xl border-b-[1px] border-slate-300`}
      style={theme}
    >
      <div className="col-span-2 md:col-span-1 sm:col-span-2 flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between items-center gap-5 sm:hidden md:hidden">
          {navbarElement.map((element, index) =>
            element.key === "duo" ? (
              <NavLink
                to={`${element.path}`}
                key={index}
                className={({ isActive }) =>
                  `flex gap-2 items-center justify-center hover:text-primary m-2 p-2 ${
                    isActive
                      ? " bg-primary/80 rounded-lg p-2 text-white"
                      : ""
                  }`
                }
              >
                {element.icon}
                {element.name}
              </NavLink>
            ) : null
          )}
        </div>

        <span className="self-start px-5 py-3 hidden sm:flex md:flex gap-2 items-center sm:justify-between md:justify-between">
          <GiHamburgerMenu
            color={theme === lightTheme ? "black" : "white"}
            size={20}
            onClick={toggleSidebar}
          />
          Menü
          <NavLink to={"/login"} className="flex justify-center items-center">
            <FaUser size={15} className="cursor-pointer m-2" /> Giriş Yap
          </NavLink>
        </span>

        <div className={`hidden sm:block md:block z-10 w-full h-auto`}>
          {isSidebarOpen &&
            navbarElement.map((menu, index) =>
              menu.key === "duo" ? (
                <NavLink
                  key={index}
                  to={`${menu.path}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <div key={index} className="flex m-2 p-2 cursor-pointer">
                    {menu.name}
                  </div>
                </NavLink>
              ) : null
            )}
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 sm:col-span-2 flex justify-between sm:justify-end items-center">
        <div className="flex justify-center items-center">
          <SearchBar placeholder="Search..." />
          <NavLink to={"/login"} className="sm:hidden md:hidden flex items-center">
            <FaUser size={20} className="cursor-pointer m-2" />
            <span className="md:hidden">Giriş Yap</span>
          </NavLink>
          <ToggleSwitch />

          {/* İkona tıklayınca menüyü açıp kapatacak */}
          <AiOutlineProduct
            size={50}
            className="cursor-pointer m-2 transform transition-transform hover:rotate-45"
            onMouseEnter={toggleMenu} // Tıklama olayını burada yakalıyoruz
          />
        </div>

        {/* Menü açıldığında burası gösterilecek */}
        {isMenuOpen && (
        <div className="absolute top-14 right-20 bg-white shadow-lg rounded-md p-4 z-50">
          <ul>
            {sectors.length > 0 ? (
              sectors.map((sector) => (
                <li 
                  key={sector.id} 
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={()=>handleChangeSector(sector.id)}
                  >
                    {sector.title}
                </li>
              ))
            ) : (
              <li>Sektör bulunamadı</li>
            )}
          </ul>
        </div>
      )}

        <div className="flex gap-2 self-center mx-2 sm:hidden">
          {contacts.map((contact) => (
            <>
              <a href={contact.facebook}>
                <FaFacebook size={15} />
              </a>
              <a href={contact.twitter}>
                <FaTwitter size={15} />
              </a>
              <a href={contact.instagram}>
                <FaInstagram size={15} />
              </a>
              <a href={contact.youtube}>
                <AiFillYoutube size={15} />
              </a>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
