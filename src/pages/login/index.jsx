import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaLock, FaUser } from "react-icons/fa";
import { AnimateContainer } from "react-animate-container";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/form";

const validationSchemaLogin = Yup.object({
  email: Yup.string().email("Geçersiz email adresi").required("Email gerekli"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre gerekli"),
});

const validationSchemaSignup = Yup.object({
  email: Yup.string().email("Geçersiz email adresi").required("Email gerekli"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre gerekli"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor")
    .required("Şifre onayı gerekli"),
});

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [animation, setAnimation] = useState(true);
  const navigate = useNavigate();
  const formFieldsLogin = [
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

  const formFieldsSignUp = [
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

  const handleToggle = () => {
    setAnimation(!animation);
    setIsLogin(!isLogin);
  };

  const handleSubmitLogin = (values) => {
    console.log(values);
    // setTimeout(() => {
    //   navigate("/admin", { replace: true });
    // }, 2000);
  };

  const handleSubmitSignUp = (values) => {
    console.log(values);
    setTimeout(() => {
      navigate("/admin", { replace: true });
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center my-20 ">
      <div
        className={`w-full max-w-md  p-8 rounded-lg shadow-lg items-center flex flex-col justify-center`}
      >
        <DynamicForm
          fields={isLogin ? formFieldsLogin : formFieldsSignUp}
          onSubmit={isLogin ? handleSubmitLogin : handleSubmitSignUp}
          validationsSchema={
            isLogin ? validationSchemaLogin : validationSchemaSignup
          }
          header={isLogin ? "Giriş Yap" : "Üye Ol"}
        />
        <div
          className="hover:text-primary/60 cursor-pointer  text-primary text-sm justify-center items-center"
          onClick={handleToggle}
        >
          {isLogin ? "Üye Ol" : "Giriş Yap"}
        </div>
      </div>
    </div>
  );
}

export default Login;
