import React, { useEffect, useState } from "react";
import DynamicForm from "../../../../components/form";
import { IoIosPricetags } from "react-icons/io";
import { MdOutlineWbIncandescent } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GetCategories } from "../../../../redux/actions/category/categoryActions";
import { ToastContainer } from "react-toastify";

const AdminAddProduct = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);

  if (loading) return <div className="text-center text-lg font-semibold py-10">Yükleniyor...</div>;

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">{error}</h1>
        <p className="text-xl mt-4 text-gray-600">Bir hata oluştu, lütfen daha sonra tekrar deneyin.</p>
      </div>
    </div>
  );

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
        label: category.category,         // hataaaaaaaaaaaaaaaaaaaaaaaaa
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
 <ToastContainer />
    </div>
  );
};

export default AdminAddProduct;
