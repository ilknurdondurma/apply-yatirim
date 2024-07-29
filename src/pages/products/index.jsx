import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "../../components/card";
import { AnimateContainer } from "react-animate-container";
import SearchBar from "../../components/searchBar";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts} from "../../redux/actions/product/productActions";
import { GetCategories} from "../../redux/actions/category/categoryActions";
import Filter from "../../components/filter";

function Products() {
  const dispatch=useDispatch();
  const {products , loading ,error}= useSelector((state)=>state.product);
  const {categories}= useSelector((state)=>state.category);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(()=>{
    dispatch(GetAllProducts());
    dispatch(GetCategories());
  },[dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);



  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      applyCategoryFilter(filtered);
    } else {
      applyCategoryFilter(products);
    }
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const applyCategoryFilter = (productsToFilter) => {
    if (selectedCategory === "all") {
      setFilteredProducts(productsToFilter);
    } else {
      const filtered = productsToFilter.filter((product) => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;
  return (
    <div>
      <section className="flex flex-col text-center mb-5 mx-5">
        <h2 className="text-2xl font-bold mb-8">Tüm Ürünler</h2>
          {/* arama */}
        <div className="w-4/5 self-end  m-5">
          <SearchBar onSearch={handleSearch} placeholder="Ürünlerde Ara"/>
        </div>




        <div className="w-full grid grid-cols-5  sm:flex sm:flex-col sm:justify-center sm:items-center gap-10 sm:gap-5">
          {/* kategoriler */}
          <div className="col-span-1 md:col-span-2"> 
            <Filter categories={categories} handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
            </div>

          {/* ürünler */}
          <div className="w-full col-span-4 md:col-span-3 grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-3">
            {filteredProducts.length > 0 ? (filteredProducts.map((product, index) => (
              <AnimateContainer.fadeIn key={product.id} duration={1}>
                <ProductCard product={product} />
              </AnimateContainer.fadeIn>
            ))) : (<div className="col-start-2">Ürün Bulunamadı..</div>)}
          </div>
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

export default Products; */