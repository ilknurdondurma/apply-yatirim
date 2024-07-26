import React, { useState } from 'react'
import DynamicForm from "../../../../components/form";
import { MdTitle } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { RxStitchesLogo } from "react-icons/rx";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { validationSchema } from "../../../../validations/admin/websites";
import { contactData } from '../../../../dummy-data/contact';


export default function AdminWebsite() {
  const [contacts, setContacts] = useState(contactData);

  const formField = [
    { name: "title", label: "İsim", type: "text", icon: <MdTitle /> },
    { name: "subTitle", label: "Alt Başlık", type: "text", icon: <MdOutlineSubtitles /> },
    { name: "slogan", label: "Slogan", type: "text", icon: <RxStitchesLogo /> },
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
};
