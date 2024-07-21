import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { GrCatalog } from "react-icons/gr";
import { RiMapPin2Line } from "react-icons/ri";
import { Gi3dStairs } from "react-icons/gi";
import { FaQuestionCircle } from "react-icons/fa";
export const navbarElements = [
  {
    id: 1,
    name: "Anasayfa",
    icon: <IoHomeOutline/>,
    path: "",
    
  },
  {
    id: 2,
    name: "Hakkımızda",
    icon: <FaQuestionCircle/>,
    path: "hakkimizda",
  },
  {
    id: 3,
    name: "Kalite",
    icon: <Gi3dStairs/>,
    path: "kalite",
  },

  {
    id: 4,
    name: "Ürünler",
    icon: <AiOutlineProduct/>,
    path: "urunler",
  },
  {
    id: 5,
    name: "E-Katalog",
    icon: <GrCatalog/>,
    path: "katalog",
  },
  {
    id: 6,
    name: "İletişim",
    icon: <RiMapPin2Line/>,
    path: "iletisim",
  },
];
