import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AddProperty, GetProperties} from '../../../../redux/actions/property/propertyActions';
import {GetAllProducts} from '../../../../redux/actions/product/productActions';
import {AddPropertyType, DeletePropertyType, GetPropertyTypes, UpdatePropertyType} from '../../../../redux/actions/propertyType/propertyTypeActions';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function AdminProperties() {
  const dispatch = useDispatch();
  const { propertyTypes, loading, error } = useSelector((state) => state.propertyType);
  const { products } = useSelector((state) => state.product);
  const theme=useSelector((state)=>state.theme.theme);

  const initialStateProperty={productId: '',propertyTypeId: '',value: ''}
  const initialStatePropertyType={title: ''}

  const [newProperty, setNewProperty] = useState(initialStateProperty);
  const [newPropertyType, setNewPropertyType] = useState(initialStatePropertyType);
  const [editingPropertyTypeId, setEditingPropertyTypeId] = useState(null);
  const [editedPropertyType, setEditedPropertyType] = useState(initialStatePropertyType);
  function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
  }
  useEffect(() => {
    deleteCookie('sectorId');
  },)
  useEffect(() => {
    dispatch(GetPropertyTypes());
    dispatch(GetAllProducts());
  }, [dispatch]);

  const handleAddProperty = async () => {
    console.log(JSON.stringify(newProperty));
    await dispatch(AddProperty(JSON.stringify(newProperty)));
    dispatch(GetAllProducts());
    setNewProperty(initialStateProperty);
    toast.success()
  };

  const handleAddPropertyType =async () => {
    await dispatch(AddPropertyType(JSON.stringify(newPropertyType)));
    setNewPropertyType(initialStatePropertyType);
    dispatch(GetPropertyTypes());
  };

  const handleEditPropertyType = async (id) => {
   if(editedPropertyType){
    await dispatch(UpdatePropertyType(editingPropertyTypeId,JSON.stringify(editedPropertyType)));
    setEditingPropertyTypeId(null);
    setEditedPropertyType(initialStatePropertyType);
    dispatch(GetPropertyTypes());
   }
  };


  const handleDeleteProperty = async (id) => {
   
   const isConfirmed = window.confirm("Bu özelliği silmek istediğinizden emin misiniz?");
   if (isConfirmed) {
    console.log(id); 
    await dispatch(DeletePropertyType(id));
    dispatch(GetPropertyTypes());
   }

  };


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
    <div className="pt-6  max-w-4xl mx-auto gap-10">

      <h2 className="text-xl font-semibold mb-4">Ürüne Özellik Değeri Ata</h2>
      <div className="mb-6">
        <div className="flex flex-col space-y-4">
          <select
            style={theme}
            value={newProperty.productId}
            onChange={(e) => setNewProperty({ ...newProperty, productId: e.target.value })}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="" >Ürün Seçin</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
          <select
          style={theme}
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
          style={theme}
            type="text"
            value={newProperty.value}
            onChange={(e) => setNewProperty({ ...newProperty, value: e.target.value })}
            placeholder="Değer"
            className="border border-gray-300 rounded-lg p-1"
          />
          <button
            onClick={handleAddProperty}
            className=" bg-blue-500 hover:bg-blue-600  py-1 px-4 rounded-lg text-white"
          >
            Ekle
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Yeni Özellik Türü Ekle</h2>
      <div className="flex space-x-4 mb-4">
        <input
        style={theme}
          type="text"
          value={newPropertyType.title}
          onChange={(e) => setNewPropertyType({ ...newPropertyType, title: e.target.value })}
          placeholder="Özellik Türü Adı"
          className="border border-gray-300 rounded-lg p-2 flex-1"
        />
        <button
          onClick={handleAddPropertyType}
          className=" bg-blue-500 text-white  py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Ekle
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Özellikler</h1>
      <div className='w-full grid grid-cols-1 '>
      {
        propertyTypes.slice().reverse().map((propertyType)=>(
          <div key={propertyType.id} className="mb-4 border-[1px] p-2 rounded-lg">
          <div className="flex items-center">
            {editingPropertyTypeId === propertyType.id ? (
              <div className="flex sm:flex-col  md:flex-col items-center flex-1">
                <input
                  style={theme}
                  type="text"
                  value={editedPropertyType.title}
                  onChange={(e) => setEditedPropertyType({ ...editedPropertyType, title: e.target.value })}
                  className="border border-gray-300 rounded-lg p-1 mr-4 flex-1"
                />
                <button
                  onClick={() => handleEditPropertyType(propertyType.id)}
                  className="bg-green-500 py-1 px-4 rounded-lg hover:bg-green-600 mr-2"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => setEditingPropertyTypeId(null)}
                  className="bg-gray-300 0 py-1 px-4 rounded-lg hover:bg-gray-400"
                >
                  İptal
                </button>
              </div>
            ) : (
              <div className='w-full flex justify-between sm:flex-col md:flex-col '>
                <span className="flex-1">{propertyType.title}</span>
                <div>
                 
                  <button
                      onClick={() => {
                      setEditingPropertyTypeId(propertyType.id);
                      setEditedPropertyType(propertyType);
                      }}
                      className="bg-yellow-500  py-1 px-4 rounded-lg hover:bg-yellow-600 mr-2"
                  >
                      Düzenle
                  </button>
                  <button
                      onClick={() => handleDeleteProperty(propertyType.id)}
                      className="bg-red-500 py-1 px-4 rounded-lg hover:bg-red-600"
                  >
                      Sil
                  </button>
                </div>
              </div>
            )}
          </div>
         
        </div>
        ))
      }
      </div> 
    

      <ToastContainer />
    </div>
  );
}
