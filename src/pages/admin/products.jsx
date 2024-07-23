import React, { useState } from "react";
import { AnimateContainer } from "react-animate-container";
import ProductCard from "../../components/card";
import productss from "../../dummy-data/products";
import DynamicForm from "../../components/form";
import { IoIosPricetags } from "react-icons/io";
import { MdOutlineWbIncandescent } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { GiCargoCrate } from "react-icons/gi";
import { categoriess } from "../../dummy-data/categories";

const ProductsAdmin = () => {
  const [categories, setCategories] = useState(categoriess);
  const [products, setProducts] = useState(productss);

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
        label: category.name,
        value: category.id,
      })),
    },
    {
      name: "inStock",
      label: "Stokta Var Mı?",
      icon: <GiCargoCrate />,
      type: "checkbox",
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

      <sections className="flex flex-col text-center my-5">
        <h2 className="text-2xl font-bold mb-8">Ürünler</h2>
        <div className="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-5 justify-center mx-auto">
          {products.map((product, index) => (
            <AnimateContainer.bounceIn duration={index}>
              <ProductCard key={product.id} product={product} />
            </AnimateContainer.bounceIn>
          ))}
        </div>
      </sections>
    </div>
  );
};

export default ProductsAdmin;
