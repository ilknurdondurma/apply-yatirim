import React, { useEffect, useState } from "react";
import DynamicForm from "../../../../components/form";
import { IoIosPricetags } from "react-icons/io";
import { MdOutlineWbIncandescent } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../redux/actions/category/categoryActions";


export default function AdminAddCatalog() {

  const formFields = [
    {
      name: "name",
      label: "Katalog Adı",
      icon: <MdOutlineWbIncandescent />,
      type: "text",
    },
    {
      name: "description",
      label: "Katalog Açıklaması",
      icon: <MdOutlineWbIncandescent />,
      type: "text",
    },
    {
      name: "image",
      label: "Resim URL",
      icon: <IoIosPricetags />,
      type: "file",
    },
  ];


  const handleSubmit = (values) => {
    console.log(values);
    alert("Form submitted successfully!");
  };

  return (
    <div style={{ padding: "20px" }} className="flex flex-col justify-center items-center">
      <DynamicForm
        fields={formFields}
        onSubmit={handleSubmit}
        header="Katalog Ekle"
      />
    </div>
  );
}
