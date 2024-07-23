import React, { useEffect, useState } from "react";
import productss from "../../dummy-data/products";
import ProductCard from "../../components/card";
import { AnimateContainer } from "react-animate-container";
import SearchBar from "../../components/searchBar";

function Products() {
  const [products, setProducts] = useState(productss);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div>
      <section className="flex flex-col text-center my-5 mx-auto">
        <h2 className="text-2xl font-bold mb-8">Tüm Ürünler</h2>
        <div className="w-3/4 mx-auto m-5">
          <SearchBar onSearch={handleSearch} placeholder="Ürünlerde Ara" />
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-center mx-auto">
          {filteredProducts.length > 0 ? (filteredProducts.map((product, index) => (
            <AnimateContainer.bounceIn key={product.id} duration={index}>
              <ProductCard product={product} />
            </AnimateContainer.bounceIn>
          ))) : (<div className="col-start-2">Ürün Bulunamadı..</div>)}
        </div>
      </section>
    </div>
  );
}

export default Products;

/*
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/actions/contact/contactActions";

function Products() {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div>
      <h2>İletişim Bilgileri</h2>
            <ul>
              {contacts.map(contact => (
                <li key={contact.id}>
                  <p>{contact.title}</p>
                  <p>{contact.body}</p>
                  <p>{contact.userId}</p>
                </li>
              ))}
            </ul>
    </div>
  );
}

export default Products;

*/