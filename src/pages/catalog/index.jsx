import React, { useState } from "react";
import catalogss from "../../dummy-data/catalogs";
import CatalogItem from "../../components/catalog";

function Catalog() {
  const [catalogs, setCatalogs] = useState(catalogss);
  return (
    <div className="w-3/5 md:w-4/5 sm:w-full  mx-auto p-5">
         <h1 className="text-xl">Ürün Kataloğu</h1>
      <div className="w-full sm:grid sm:grid-cols-2 gap-2 ">
     
        {catalogs.map((catalog) => (
          <CatalogItem catalog={catalog} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
