import React, { useEffect, useState } from 'react'
import DynamicForm from "../../../../components/form";
import { MdTitle } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { RxStitchesLogo } from "react-icons/rx";
import { validationSchema } from "../../../../validations/admin/websites";
import { contactData } from '../../../../dummy-data/contact';
import { useDispatch, useSelector } from 'react-redux';
import {GetContacts} from "../../../../redux/actions/contact/contactActions"


export default function AdminWebsite() {
  const dispatch=useDispatch();
  const {contacts , loading ,error}= useSelector((state)=>state.contact);

  useEffect(()=>{
    dispatch(GetContacts());
  },[dispatch]);

 if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;
  const formField = [
    { name: "title", label: "İsim", type: "text", icon: <MdTitle /> },
    { name: "subTitle", label: "Alt Başlık", type: "text", icon: <MdOutlineSubtitles /> },
    { name: "slogan", label: "Slogan", type: "text", icon: <RxStitchesLogo /> },
  
  ];

  const handleFormSubmit = (values) => {
    console.log(values);
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
    </div>
  );
};
