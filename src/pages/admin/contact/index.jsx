import React, { useEffect, useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { contactData } from '../../../dummy-data/contact';
import DynamicForm from '../../../components/form';
import { validationSchema } from '../../../validations/admin/contact';
import { useDispatch, useSelector } from 'react-redux';
import {GetContacts} from "../../../redux/actions/contact/contactActions"


export default function AdminContact() {
  const dispatch=useDispatch();
  const {contacts , loading ,error}= useSelector((state)=>state.contact);

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
    { name: "email", label: "Email", type: "text", icon: <AiOutlineMail /> },
    { name: "phone", label: "Telefon Numarası", type: "text", icon: <MdOutlinePhoneAndroid /> },
    { name: "address", label: "Adres", type: "text", icon: <IoLocationSharp /> },
  ];

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col justify-center  w-full p-5">
      <h1 className="text-2xl font-bold mb-5">Website Page</h1>
      <h2 className="text-xl font-bold mb-2">Update Website Elements</h2>
      <div className="w-full gap-4">
        <DynamicForm
          fields={formField}
          initialsValues={contacts[0]}
          onSubmit={handleFormSubmit}
          validationsSchema={validationSchema}
        />
      </div>
    </div>
  );
}
