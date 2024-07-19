import { FaLock, FaUser } from "react-icons/fa";

export const fieldsLogin = [
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "ayilmaz@gmail.com",
    icon: <FaUser className="text-gray-400" />,
  },
  {
    name: "password",
    label: "Şifre",
    type: "password",
    placeholder: "****",
    icon: <FaLock className="text-gray-400" />,
  },
];
