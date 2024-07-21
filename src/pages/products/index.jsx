import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/actions/contact/contactActions";
import productss from "../../dummy-data/products";
import ProductCard from "../../components/card";
import { AnimateContainer } from "react-animate-container";
function Products() {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contact);
  const [products, setProducts] = useState(productss);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div>
      <sections className="flex flex-col text-center my-5 mx-auto">
        <h2 className="text-2xl font-bold mb-8">Ürünler</h2>
        <div className="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-center mx-auto">
          {products.map((product, index) => (
            <AnimateContainer.bounceIn duration={index}>
              <ProductCard key={product.id} product={product} />
            </AnimateContainer.bounceIn>
          ))}
        </div>
      </sections>
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