import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {GetProperties} from '../../../../redux/actions/property/propertyActions';
import {GetAllProducts} from '../../../../redux/actions/product/productActions';
import {GetPropertyTypes} from '../../../../redux/actions/propertyType/propertyTypeActions';

export default function AdminProperties() {
  const dispatch = useDispatch();
  const { propertyTypes, loading, error } = useSelector((state) => state.propertyType);
  const { properties } = useSelector((state) => state.property);
  const { products } = useSelector((state) => state.product);

  const [newPropertyType, setNewPropertyType] = useState('');
  const [newProperty, setNewProperty] = useState({
    productId: '',
    propertyTypeId: '',
    value: '',
  });

  useEffect(() => {
    dispatch(GetPropertyTypes());
    dispatch(GetProperties());
    dispatch(GetAllProducts());
  }, [dispatch]);

  const handleAddPropertyType = () => {
    //dispatch(addPropertyType({ title: newPropertyType }));
    setNewPropertyType('');
  };

  const handleAddProperty = () => {
    //dispatch(addProperty(newProperty));
    setNewProperty({ productId: '', propertyTypeId: '', value: '' });
  };

  if (loading) return <div className="text-center">Yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Özellikler</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Yeni Özellik Türü Ekle</h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            value={newPropertyType}
            onChange={(e) => setNewPropertyType(e.target.value)}
            placeholder="Özellik Türü Adı"
            className="border border-gray-300 rounded-lg p-2 flex-1"
          />
          <button
            onClick={handleAddPropertyType}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Ekle
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Yeni Özellik Ekle</h2>
        <div className="flex flex-col space-y-4">
          <select
            value={newProperty.productId}
            onChange={(e) => setNewProperty({ ...newProperty, productId: e.target.value })}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">Ürün Seçin</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
          <select
            value={newProperty.propertyTypeId}
            onChange={(e) => setNewProperty({ ...newProperty, propertyTypeId: e.target.value })}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">Özellik Türü Seçin</option>
            {propertyTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newProperty.value}
            onChange={(e) => setNewProperty({ ...newProperty, value: e.target.value })}
            placeholder="Değer"
            className="border border-gray-300 rounded-lg p-2"
          />
          <button
            onClick={handleAddProperty}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg "
          >
            Ekle
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Mevcut Özellikler</h2>
        {properties.length > 0 ? (
          <div className="space-y-4">
            {properties.map((property) => (
              <div key={property.id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    {property.title}
                    {/* {propertyTypes.find((type) => type.id === property.property_type_id)?.title} */}
                  </span>
                  <span className="text-sm text-gray-500">{new Date(property.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="mb-4">{property.value}</p>
                <span className="text-sm text-gray-500">
                  Bu Özelliğe Sahip Ürünler: {products.find((product) => product.id === 1)?.title}
                  {/* Ürün: {products.find((product) => product.id === property.product_id)?.title} */}
                </span>
                <div className="mt-4 flex space-x-4">
                  <button
                    // onClick={() => handleEditProperty(property.id)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                  >
                    Düzenle
                  </button>
                  <button
                    // onClick={() => handleDeleteProperty(property.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Özellik bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
}
