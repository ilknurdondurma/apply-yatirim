import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { GrCatalog } from "react-icons/gr";
import { RiMapPin2Line } from "react-icons/ri";
import { Gi3dStairs } from "react-icons/gi";
import { FaQuestionCircle } from "react-icons/fa";
import { BsDatabaseLock } from "react-icons/bs";
export const navbarElements = [
  {
    id: 1,
    name: "Anasayfa",
    icon: <IoHomeOutline/>,
    path: "",
    submenus: [
      { id: 12, name: 'Web Sitesi', path: 'website' },
      { id: 13, name: 'Hizmetler', path: 'hizmetler' },
      { id: 14, name: 'Ekibimiz', path: 'ekibimiz' },
    ],
  },
  {
    id: 2,
    name: "Yönetim",
    icon: <BsDatabaseLock/>,
    path: "yonetim",
    submenus: [
      { id: 21, name: 'Kategoriler', path: 'kategoriler' },
      { id: 22, name: 'Kullancılar', path: 'kullanicilar' },
      { id: 23, name: 'Gelen Yorumlar', path: 'yorumlar' },
      { id: 24, name: 'Ürün Özellikleri', path: 'ozellikler' },
      { id: 25, name: 'Model ve Uyumluluklar', path: 'modeller' },
    ],
  },
  {
    id: 3,
    name: "Hakkımızda",
    icon: <FaQuestionCircle/>,
    path: "hakkimizda",
    submenus: [
      { id: 31, name: 'Hakkımızda', path: 'hakkimizda' },
    ],
  },
  {
    id: 4,
    name: "Kalite",
    icon: <Gi3dStairs/>,
    path: "kalite",
    submenus: [
      { id: 41, name: 'Kalite', path: 'kalite' },
    ],
  },

  {
    id: 5,
    name: "Ürünler",
    icon: <AiOutlineProduct/>,
    path: "urunler",
    submenus: [
      { id: 51, name: 'Ürün Listesi', path: 'urun-listesi' },
      { id: 52, name: 'Ürün Ekle', path: 'urun-ekle' },
    ],
  },
  {
    id: 6,
    name: "E-Katalog",
    icon: <GrCatalog/>,
    path: "katalog",
    submenus: [
      { id: 61, name: 'Katalog Listesi', path: 'katalog-listesi' },
      { id: 62, name: 'Katalog Ekle', path: 'katalog-ekle' },
    ],
  },
  {
    id: 7,
    name: "İletişim",
    icon: <RiMapPin2Line/>,
    path: "iletisim",
    submenus: [
      { id: 71, name: 'İletişim Bilgileri', path: 'iletisim' },
    ],
  },
  
];
