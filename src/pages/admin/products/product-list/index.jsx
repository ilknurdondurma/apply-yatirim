import React, { useEffect, useState } from "react";
import { AnimateContainer } from "react-animate-container";
import ProductCard from "../../../../components/card";
import productss from "../../../../dummy-data/products";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../../../redux/actions/product/productActions";

const AdminProductList = () => {
  const dispatch=useDispatch();
  const {products , loading ,error}= useSelector((state)=>state.product);

  useEffect(()=>{
    dispatch(fetchAllProduct());
  },[dispatch]);

 if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;

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
    </div>
  );
};

export default AdminProductList;
