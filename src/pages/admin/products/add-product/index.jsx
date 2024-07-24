import React, { useEffect, useState } from "react";
import DynamicForm from "../../../../components/form";
import { IoIosPricetags } from "react-icons/io";
import { MdOutlineWbIncandescent } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../redux/actions/category/categoryActions";

const AdminAddProduct = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;

  //asagısı düzeltileek formfield
  const formFields = [
    {
      name: "name",
      label: "Ürün Adı",
      icon: <MdOutlineWbIncandescent />,
      type: "text",
    },
    {
      name: "description",
      label: "Ürün Açıklaması",
      icon: <MdOutlineWbIncandescent />,
      type: "text",
    },
    {
      name: "price",
      label: "Fiyatı",
      icon: <IoIosPricetags />,
      type: "number",
    },
    {
      name: "category",
      label: "Ürün Kategorisi",
      type: "select",
      icon: <MdCategory />,
      options: categories.map((category) => ({
        label: category.username,         // hataaaaaaaaaaaaaaaaaaaaaaaaa
        value: category.id,
      })),
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
        header="Ürün Ekle"
      />

    </div>
  );
};

export default AdminAddProduct;
