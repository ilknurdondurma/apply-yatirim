import React, { useEffect, useState } from "react";
import { AnimateContainer } from "react-animate-container";
import ProductCard from "../../../../components/card";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../../../redux/actions/product/productActions";
import { ToastContainer } from "react-toastify";

const AdminProductList = () => {
  const dispatch=useDispatch();
  const {products , loading ,error}= useSelector((state)=>state.product);

  useEffect(()=>{
    dispatch(GetAllProducts());
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

  return (
    <div style={{ padding: "20px" }} className="flex flex-col justify-center items-center">

      <sections className="flex flex-col text-center my-5">
        <h2 className="text-2xl font-bold mb-8">Ürünler</h2>
        <div className="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-5 justify-center mx-auto">
          {products.map((product, index) => (
            <AnimateContainer.fadeIn duration={1}>
              <ProductCard key={index} product={product} />
            </AnimateContainer.fadeIn>
          ))}
        </div>
      </sections>
      <ToastContainer />
    </div>
  );
};

export default AdminProductList;
