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

 if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;

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
