import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetProductById } from '../../redux/actions/product/productActions';
import DetailCard from '../../components/detail-card';

export default function ProductDetail() {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(GetProductById(id));
  }, [dispatch, id]);

  

  if (loading) return <div className="text-center text-lg font-semibold py-10">Yükleniyor...</div>;

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">{error}</h1>
        <p className="text-xl mt-4 text-gray-600">Bir hata oluştu, lütfen daha sonra tekrar deneyin.</p>
      </div>
    </div>
  );
  if (!products) return <div className="text-center text-lg font-semibold py-10" >Ürün bulunamadı...</div>;

  return (
    <div>
      <DetailCard products={products}/>
    </div>
  );
}
