import React, { useState } from "react";
import ProductCard from "../../components/card";
import productss from "../../dummy-data/products";
import servicess from "../../dummy-data/services";
import customerStoriess from "../../dummy-data/customerStories";
import teamMembers from "../../dummy-data/team";
import blogPosts from "../../dummy-data/blogs";
import Banner from "../../components/banner";
import Slider from "../../components/slider";
import { AnimateContainer } from "react-animate-container";

function Home() {
  const [products, setProducts] = useState(productss);
  const [services, setServices] = useState(servicess);
  const [customerStories, setCustomerStories] = useState(customerStoriess);
  const [team, setTeam] = useState(teamMembers);
  const [blogs, setBlogs] = useState(blogPosts);

  return (
    <div>
      <section>
        <Banner />
      </section>

      {/* Hizmetler veya Çözümler Bölümü */}
      <section className="py-10 px-4 text-center border-b-2">
        <h2 className="text-2xl font-bold mb-8">Hizmetlerimiz</h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-4 bg-white shadow-lg rounded-lg"
              >
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          <Slider story={customerStories} />
        </div>
      </section>

      {/* Ürünler Bölümü */}
      <section className="flex flex-col text-center my-5 mx-auto p-5">
        <h2 className="text-2xl font-bold mb-8">Ürünler</h2>
        <div className="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-center mx-auto">
          {products.map((product, index) => (
            <AnimateContainer.bounceIn duration={index} key={product.id}>
              <ProductCard product={product} />
            </AnimateContainer.bounceIn>
          ))}
        </div>
      </section>

     

      {/* Ekibimiz Bölümü */}
      <section className="py-10 px-4  text-center border-b-2 ">
        <h2 className="text-2xl font-bold mb-8">Ekibimiz</h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.id} className="p-4 bg-white shadow-lg rounded-lg">
                <img src={member.photo} alt={member.name} className="rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Yazıları Bölümü */}
      <section className="py-10 px-4 text-center border-b-2 ">
        <h2 className="text-2xl font-bold mb-8">Son Blog Yazıları</h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="p-4 bg-white shadow-lg rounded-lg">
                <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-600">{blog.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default Home;
const responsiveGrid = "sm:gap-2 md:grid-cols-1 sm:grid-cols-1";
const responsiveText = "md:text-sm sm:text-sm lg:text-md";
