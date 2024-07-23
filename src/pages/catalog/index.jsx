import React, { useState } from "react";
import catalogss from "../../dummy-data/catalogs";
import CatalogItem from "../../components/catalog";
import SearchBar from "../../components/searchBar";

function Catalog() {
  const [catalogs, setCatalogs] = useState(catalogss);
  const [filteredCatalogs, setFilteredCatalogs] = useState(catalogs);

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = catalogs.filter(catalog =>
        catalog.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCatalogs(filtered);
    } else {
      setFilteredCatalogs(catalogs);
    }
  };
  return (
    <div>
      <section className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-8">Ürün Katalogları</h2>
        <div className="w-3/4 mx-auto m-5">
        <SearchBar onSearch={handleSearch} placeholder="Kataloglarda Ara" />
        </div>

        <div className="w-4/5 md:w-4/5 sm:w-full  mx-auto p-5">
          <div className="w-full grid grid-cols-2 gap-2 " >
            {filteredCatalogs.length >0 ? (filteredCatalogs.map((catalog) => (
              <CatalogItem catalog={catalog} />
            ))) :(<div className="flex items-center justify-center">Katalog Bulunamadı..</div>)}
          </div>
      </div>
      </section>
    </div>
  );
}

export default Catalog;
