import React, { useState } from "react";
import * as Yup from "yup";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/form";
import { loginSchema } from "../../validations/auth/login";
import { signupSchema } from "../../validations/auth/signup";
import { fieldsLogin } from "../../formFields/login";
import { fieldsSignUp } from "../../formFields/signup";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [animation, setAnimation] = useState(true);
  const navigate = useNavigate();

  const validationSchemaLogin = loginSchema;
  const validationSchemaSignup = signupSchema;

  const formFieldsLogin = fieldsLogin;
  const formFieldsSignUp = fieldsSignUp;

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
