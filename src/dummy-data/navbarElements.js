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
    submenus: [
      { id: 21, name: 'List Users', path: 'hakkimizda' },
      { id: 22, name: 'Add User', path: 'adasa' },
    ],
  },
  {
    id: 2,
    name: "Hakkımızda",
    icon: <FaQuestionCircle/>,
    path: "hakkimizda",
    submenus: [
      { id: 21, name: 'List Users', path: 'list-users' },
      { id: 22, name: 'Add User', path: 'kalite' },
    ],
  },
  {
    id: 3,
    name: "Kalite",
    icon: <Gi3dStairs/>,
    path: "kalite",
    submenus: [
      { id: 21, name: 'List Users', path: 'list-users' },
      { id: 22, name: 'Add User', path: 'add-user' },
    ],
  },

  {
    id: 4,
    name: "Ürünler",
    icon: <AiOutlineProduct/>,
    path: "urunler",
    submenus: [
      { id: 21, name: 'List Users', path: 'list-users' },
      { id: 22, name: 'Add User', path: 'add-user' },
    ],
  },
  {
    id: 5,
    name: "E-Katalog",
    icon: <GrCatalog/>,
    path: "katalog",
    submenus: [
      { id: 21, name: 'List Users', path: 'list-users' },
      { id: 22, name: 'Add User', path: 'add-user' },
    ],
  },
  {
    id: 6,
    name: "İletişim",
    icon: <RiMapPin2Line/>,
    path: "iletisim",
    submenus: [
      { id: 21, name: 'List Users', path: 'list-users' },
      { id: 22, name: 'Add User', path: 'add-user' },
    ],
  },
];
