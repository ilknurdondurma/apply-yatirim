import React from "react";
import DynamicForm from "../../../../components/form";
import { IoIosPricetags } from "react-icons/io";
import { MdOutlineWbIncandescent } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AddCatalog } from "../../../../redux/actions/catalog/catalogActions";
import {validationSchema} from "../../../../validations/admin/catalog";
import { toast, ToastContainer } from "react-toastify";


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


  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const catalogRequest = new FormData();
      const catalogData = {
        title: values.name,
        description: values.description,
      };
      catalogRequest.append("data", JSON.stringify(catalogData));
      catalogRequest.append("file", values.file);

      try {
        await dispatch(AddCatalog(catalogRequest));
        toast.success("Katalog başarıyla eklendi!");
      } catch (error) {
        toast.error("Katalog ekleme işlemi başarısız");
      }
    } catch (error) {
      alert("Katalog ekleme işlemi başarısız oldu.");
    }
  };

  return (
    <div style={{ padding: "20px" }} className="flex flex-col justify-center items-center">
      <DynamicForm
        fields={formFields}
        onSubmit={handleSubmit}
        header="Katalog Ekle"
        validationsSchema={validationSchema}
      />
      <ToastContainer />
    </div>
  );
}
