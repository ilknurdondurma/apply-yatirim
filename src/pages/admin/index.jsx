import React, { useState } from "react";
import { contactData } from "../../dummy-data/contact";
import DynamicForm from "../../components/form";
function Admin() {
  const handleSubmit = (e) => {};
  const [contacts, setContacts] = useState(contactData);
  const formFields = [
    { name: "name", label: "İsim", type: "text" },
    { name: "subTitle", label: "Alt Başlık", type: "text" },
    { name: "slogan", label: "Slogan", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "phone", label: "Telefon Numarası", type: "text" },
    { name: "address", label: "Adres", type: "text" },
  ];

  const initialValues = {
    name: contacts[0].name,
    subTitle: contacts[0].subTitle,
    slogan: contacts[0].slogan,
    email: contacts[0].email,
    phone: contacts[0].phone,
    address: contacts[0].address,
  };
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <h1 className="text-xl"> Admin Panel'e Hoşgeldiniz </h1>
      <DynamicForm
        fields={formFields}
        initialsValues={initialValues}
        header="Bilgileri Güncelle"
      />
    </div>
  );
}

export default Admin;
