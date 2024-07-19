import React, { useState } from "react";
import catalogss from "../../dummy-data/catalogs";
import CatalogItem from "../../components/catalog";

function Catalog() {
  const [catalogs, setCatalogs] = useState(catalogss);
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Ürün Kataloğu</h1>
      <div className="w-full">
        {catalogs.map((catalog) => (
          <CatalogItem catalog={catalog} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
