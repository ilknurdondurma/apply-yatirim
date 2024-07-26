import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../redux/actions/product/productActions';
import DetailCard from '../../components/detail-card';

export default function ProductDetail() {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  


  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;
  if (!products) return <div>Ürün bulunamadı...</div>;

  return (
    <div>
      <DetailCard products={products}/>
    </div>
  );
}
