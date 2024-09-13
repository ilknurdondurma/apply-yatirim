import React, { useEffect, useState } from "react";
import ProductCard from "../../components/card";
import Banner from "../../components/banner";
import Slider from "../../components/slider";
import { AnimateContainer } from "react-animate-container";
import { NavLink, useNavigate } from "react-router-dom";
import { GetAllProducts } from "../../redux/actions/product/productActions";
import { useDispatch, useSelector } from "react-redux";
import { GetServices } from "../../redux/actions/service/serviceActions";
import { GetComments } from "../../redux/actions/comment/commentActions";
import { GetSectors } from "../../redux/actions/sector/sectorActions";
import Cookies from 'js-cookie';
import { getSectorById } from "../../api";
import imageBanner from "../../assets/bg.png";
import backgroundImage from '../../assets/image1-removebg.png';
import { GrServices } from "react-icons/gr";
import MySlider from "../../components/slider/slider";

function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { sectors } = useSelector((state) => state.sector);
  const navigate = useNavigate();
  const [sectorId, setSectorId] = useState(Cookies.get('sectorId'));
  const [banner, setBanner] = useState({});
  const { comments } = useSelector((state) => state.comment);
  const { services } = useSelector((state) => state.service);

  useEffect(() => {
    if (sectorId) {
      getSectorById(sectorId)
        .then((result) => {
          setBanner(result?.data || {});
        })
        .catch((error) => {
          console.log("Bilinmeyen bir hata oluştu.");
        });
      dispatch(GetAllProducts()); // Ürünleri sectorId'ye göre getir
      dispatch(GetServices()); // Hizmetleri sectorId'ye göre getir
      dispatch(GetComments());
    } else {
      navigate('/splash');
    }
  }, [dispatch, navigate, sectorId]);

  if (loading) return <div className="text-center text-lg font-semibold py-10">Yükleniyor...</div>;
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">{error}</h1>
        <p className="text-xl mt-4 text-gray-600">Bir hata oluştu, lütfen daha sonra tekrar deneyin.</p>
      </div>
    </div>
  );

  return (
    <div>
      <section>
        <Banner banner={banner} backgroundImage={imageBanner} />
      </section>

      {/* Ürünler Bölümü */}
      <section className="flex flex-col text-center mx-auto p-5">
        <h2 className="text-2xl font-bold mb-8">Popüler Ürünler</h2>
        <div className="sm:hidden grid grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-center mx-auto">
          {Array.isArray(products) && products.slice(0, 4).map((product, index) => (
            <AnimateContainer.bounceIn duration={index} key={product.id}>
              <ProductCard product={product} />
            </AnimateContainer.bounceIn>
          ))}
        </div>
        <div className="hidden sm:block">
          <MySlider>
            {Array.isArray(products) && products.slice(0, 4).map((product, index) => (
              <AnimateContainer.bounceIn duration={index} key={product.id}>
                <ProductCard product={product} />
              </AnimateContainer.bounceIn>
            ))}
          </MySlider>
        </div>
        <NavLink to="/urunler" className="my-5 text-primary">
          <span>Tüm ürünler için tıklayın...</span>
        </NavLink>
      </section>

      {/* Hizmetler veya Çözümler Bölümü */}
      <div className="flex md:flex-col sm:flex-col justify-center items-center">
        <div className="w-1/4 md:w-1/2 sm:w-1/2 h-auto ">
          {banner.imageUrl2 && (
            <img src={`data:image/jpeg;base64,${banner.imageUrl2}`} alt="resim" className="object-cover"/>
          )}
        </div>

        <section className="py-10 px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">Hizmetlerimiz</h2>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-8">
              {services.slice(0, 6).map((service) => (
                <div
                  key={service.id}
                  className="p-10 gap-2 shadow-lg shadow-gray-500 rounded-lg grid grid-cols-4 sm:grid-cols-1"
                >
                  <div className="col-span-1 flex justify-center items-center"><GrServices size={50} /></div>
                  <div className="col-span-3">
                    <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-500">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Referanslar veya Müşteri Hikayeleri Bölümü */}
      <section className="py-5 px-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-5 text-center">Müşteri Hikayeleri</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          <Slider story={comments} />
        </div>
      </section>

      {/* Ürünler Bölümü */}
      <section className="flex flex-col text-center mx-auto p-5">
        <h2 className="text-2xl font-bold mb-8">Son Eklenen Ürünler</h2>
        <div className="sm:hidden grid grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-center mx-auto">
          {Array.isArray(products) && products.slice(-4).map((product, index) => (
            <AnimateContainer.bounceIn duration={index} key={product.id}>
              <ProductCard product={product} />
            </AnimateContainer.bounceIn>
          ))}
        </div>
        <div className="hidden sm:block">
          <MySlider>
            {Array.isArray(products) && products.slice(-4).map((product, index) => (
              <AnimateContainer.bounceIn duration={index} key={product.id}>
                <ProductCard product={product} />
              </AnimateContainer.bounceIn>
            ))}
          </MySlider>
        </div>
        <NavLink to="/urunler" className="my-5 text-primary">
          <span>Tüm ürünler için tıklayın...</span>
        </NavLink>
      </section>
    </div>
  );
}

export default Home;
