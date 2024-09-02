import React, { useEffect, useState } from "react";
import { AnimateContainer } from "react-animate-container";
import CatalogItem from "../../../../components/catalog";
import { useDispatch, useSelector } from "react-redux";
import { GetCatalogs} from "../../../../redux/actions/catalog/catalogActions"

const AdminCatalogList = () => {
  const dispatch=useDispatch();
  const {catalogs , loading ,error}= useSelector((state)=>state.catalog);

  useEffect(()=>{
    dispatch(GetCatalogs());
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
    <div style={{ padding: "20px" }} className="flex flex-col justify-center items-center grid grid-cols-1">

      <sections className="flex flex-col text-center my-5">
        <h2 className="text-2xl font-bold mb-8">Kataloglar</h2>
        <div className="grid grid-cols-1 gap-5">
          {catalogs.map((catalog, index) => (
            <AnimateContainer.fadeIn duration={1}>
              <CatalogItem catalog={catalog} />
            </AnimateContainer.fadeIn>
          ))}
        </div>
      </sections>
    </div>
  );
};

export default AdminCatalogList;
