import React from "react";
import ProductCard from "../../components/card";
import products from "../../dummy-data/products";
import services from "../../dummy-data/services";
import Banner from "../../components/banner";
import Story from "../../components/story";
import customerStories from "../../dummy-data/customerStories";
import { AnimateContainer } from "react-animate-container";
function Home() {
  return (
    <div>
      <section>
        <Banner />
      </section>

      {/* Hizmetler veya Çözümler Bölümü */}
      <section className="py-10 px-4 text-center">
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
      <section className="py-5 px-4 bg-slate-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-5 text-center">
          Müşteri Hikayeleri
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          <Story story={customerStories} />
        </div>
      </section>

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

export default Home;
