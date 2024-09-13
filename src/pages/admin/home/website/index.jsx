import React, { useEffect, useState } from 'react'
import DynamicForm from "../../../../components/form";
import { MdTitle } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { RxStitchesLogo } from "react-icons/rx";
import { validationSchema } from "../../../../validations/admin/websites";
import { useDispatch, useSelector } from 'react-redux';
import {GetContacts , UpdateContact} from "../../../../redux/actions/contact/contactActions"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminWebsite() {
  const dispatch=useDispatch();
  const {contacts , loading ,error}= useSelector((state)=>state.contact);
  function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
  }
  useEffect(() => {
    deleteCookie('sectorId');
  },)

  
  useEffect(()=>{
    dispatch(GetContacts());
  },[dispatch]);

 if (loading) return <div className="text-center text-lg font-semibold py-10">Yükleniyor...</div>;

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">{error}</h1>
        <p className="text-xl mt-4 text-gray-600">Bir hata oluştu, lütfen daha sonra tekrar deneyin.</p>
      </div>
    </div>
  );
  const formField = [
    { name: "title", label: "İsim", type: "text", icon: <MdTitle /> },
    { name: "subTitle", label: "Alt Başlık", type: "text", icon: <MdOutlineSubtitles /> },
    { name: "slogan", label: "Slogan", type: "text", icon: <RxStitchesLogo /> },
  
  ];

  const handleFormSubmit = async (values) => {
    console.log(values);
    var id =contacts[0].id;
    console.log(id);
    await dispatch(UpdateContact(id ,values));
    dispatch(GetContacts());
  };

  return (
    <div className="flex flex-col justify-center  w-full p-5">
      <h1 className="text-2xl font-bold mb-5">Website Page</h1>
      <h2 className="text-xl font-bold mb-2">Update Website Elements</h2>
      <div className="w-full gap-4 flex justify-center items-center">
        <DynamicForm
          fields={formField}
          initialsValues={contacts[0]}
          onSubmit={handleFormSubmit}
          validationsSchema={validationSchema}
        />
      </div>
      <ToastContainer />
    </div>
  );
};
