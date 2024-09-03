import React, { useEffect, useState } from "react";
import CatalogItem from "../../components/catalog";
import SearchBar from "../../components/searchBar";
import { useDispatch, useSelector } from "react-redux";
import { GetCatalogs } from "../../redux/actions/catalog/catalogActions";
import { ToastContainer } from "react-toastify";

function Catalog() {
  const dispatch=useDispatch();
  const {catalogs , loading ,error}= useSelector((state)=>state.catalog);
  const [filteredCatalogs, setFilteredCatalogs] = useState(catalogs);

  useEffect(() => {
    dispatch(GetCatalogs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCatalogs(catalogs);
  }, [catalogs]);

  if (loading) return <div className="text-center text-lg font-semibold py-10">Yükleniyor...</div>;

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">{error}</h1>
        <p className="text-xl mt-4 text-gray-600">Bir hata oluştu, lütfen daha sonra tekrar deneyin.</p>
      </div>
    </div>
  );

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = catalogs.filter(catalog =>
        catalog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCatalogs(filtered);
    } else {
      setFilteredCatalogs(catalogs);
    }
  };
  return (
    <div>
      <section className="w-3/5 sm:w-full flex flex-col items-center mx-auto">
      <h1 className="text-4xl font-bold  mt-20 text-center mb-12">Ürün Katalogları</h1>

        <div className="w-3/4 mx-auto m-5">
        <SearchBar onSearch={handleSearch} placeholder="Kataloglarda Ara" />
        </div>

        <div className=" mx-auto p-5">
          <div className="grid grid-cols-1 gap-5 " >
            {filteredCatalogs.length >0 ? (filteredCatalogs.map((catalog) => (
              <CatalogItem catalog={catalog} />
            ))) :(<div className="flex items-center justify-center">Katalog Bulunamadı..</div>)}
          </div>
      </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Catalog;