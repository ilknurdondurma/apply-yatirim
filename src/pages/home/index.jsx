import React, { useEffect, useState } from "react";
import ProductCard from "../../components/card";
import servicess from "../../dummy-data/services";
import customerStoriess from "../../dummy-data/customerStories";
import teamMembers from "../../dummy-data/team";
import blogPosts from "../../dummy-data/blogs";
import Banner from "../../components/banner";
import Slider from "../../components/slider";
import { AnimateContainer } from "react-animate-container";
import { NavLink } from "react-router-dom";
import { GetAllProducts } from "../../redux/actions/product/productActions";
import { useDispatch, useSelector } from "react-redux";
import { GetServices } from "../../redux/actions/service/serviceActions";
import { GetTeams } from "../../redux/actions/team/teamActions";
import { GetStories } from "../../redux/actions/customerStory/customerStoryActions";


function Home() {
  const dispatch=useDispatch();
  const {products , loading ,error}= useSelector((state)=>state.product);
  const {services }= useSelector((state)=>state.service);
  const {customerStories }= useSelector((state)=>state.story);
  const {teams }= useSelector((state)=>state.team);

  useEffect(()=>{
    dispatch(GetAllProducts());
    dispatch(GetServices());
    dispatch(GetStories());
    dispatch(GetTeams());
  },[dispatch]);

 if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;

  return (
    <div>
      <section>
        <Banner />
      </section>

      {/* Hizmetler veya Çözümler Bölümü */}
      <section className="py-10 px-4 text-center border-b-[1px] ">
        <h2 className="text-2xl font-bold mb-8">Hizmetlerimiz</h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0,6).map((service) => (
              <div
                key={service.id}
                className="p-4 shadow-lg rounded-lg"
              >
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-500">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referanslar veya Müşteri Hikayeleri Bölümü */}
      <section className="py-5 px-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-5 text-center">
          Müşteri Hikayeleri
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8" >
          <Slider story={customerStories} />
        </div>
      </section>
    

      {/* Ürünler Bölümü */}
      <section className="flex flex-col text-center my-5 mx-auto p-5">
        <h2 className="text-2xl font-bold mb-8">Son Eklenen Ürünler</h2>
        <div className="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-center mx-auto">
          {Array.isArray(products) && products.slice(-4).map((product, index) => (
            <AnimateContainer.bounceIn duration={index} key={product.id}>
              <ProductCard product={product} />
            </AnimateContainer.bounceIn>
          ))}
        </div>
        <NavLink to="/urunler" className="m-10 text-primary">
          <span>Tüm ürünler için tıklayın...</span>
        </NavLink>
      </section>

     

      {/* Ekibimiz Bölümü */}
      <section className="py-10 px-4  text-center ">
        <h2 className="text-2xl font-bold mb-8">Ekibimiz</h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-2 gap-8">
            {teams.map((member) => (
              <div key={member.id} className="p-4  shadow-lg rounded-lg">
                <img src={member.image} alt={member.name} className="rounded-full mx-auto mb-4" style={{height:"100px" , width:"auto"}}/>
                <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                <p className="text-gray-400">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      
    </div>
  );
}

export default Home;

