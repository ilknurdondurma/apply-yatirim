import { FaLock, FaUser } from "react-icons/fa";

export const fieldsSignUp = [
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
  {
    name: "confirmPassword",
    label: "Şifre Onayı",
    type: "password",
    placeholder: "****",
    icon: <FaLock className="text-gray-400" />,
  },
];
