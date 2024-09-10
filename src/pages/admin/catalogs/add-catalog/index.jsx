import React, { useEffect, useState } from "react";
import DynamicForm from "../../../../components/form";
import { IoIosPricetags } from "react-icons/io";
import { MdOutlineWbIncandescent } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../redux/actions/category/categoryActions";
import { AddCatalog } from "../../../../redux/actions/catalog/catalogActions";


export default function AdminAddCatalog() {
  const dispatch = useDispatch();

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
      name: "file",
      label: "Katalog Dosyası",
      icon: <IoIosPricetags />,
      type: "file",
    },
  ];


  const handleSubmit = (values) => {
    console.log(values);
    try{
      const catalogRequest = new FormData();
      catalogRequest.append('data', JSON.stringify(values));
      dispatch(AddCatalog(0,values))
    }
    catch{
      alert("Katalog ekleme işlemi başarısız oldu.");
    }
    
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
