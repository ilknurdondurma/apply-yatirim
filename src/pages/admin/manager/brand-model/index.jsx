import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetBrands, AddBrand, UpdateBrand, DeleteBrand } from '../../../../redux/actions/brand/brandActions';
import { GetModels, AddModel, UpdateModel, DeleteModel } from '../../../../redux/actions/model/modelActions';
import { GetAllProducts } from '../../../../redux/actions/product/productActions';

export default function AdminModels() {
  const dispatch = useDispatch();
  const { brands } = useSelector(state => state.brand);
  const { models } = useSelector(state => state.model);
  const { products } = useSelector(state => state.product);

  const [newBrand, setNewBrand] = useState('');
  const [newModel, setNewModel] = useState({ name: '', id: '' });
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [editingBrand, setEditingBrand] = useState(null);
  const [editingModel, setEditingModel] = useState(null);

  useEffect(() => {
    dispatch(GetBrands());
    dispatch(GetModels());
    dispatch(GetAllProducts());
  }, [dispatch]);

  const handleAddBrand = () => {
    dispatch(AddBrand({ title: newBrand }));
    setNewBrand('');
  };

  const handleUpdateBrand = () => {
    dispatch(UpdateBrand(editingBrand));
    setEditingBrand(null);
  };

  const handleDeleteBrand = (brandId) => {
    dispatch(DeleteBrand(brandId));
  };

  const handleAddModel = () => {
    dispatch(AddModel(newModel));
    setNewModel({ name: '', brandId: '' });
  };

  const handleUpdateModel = () => {
    dispatch(UpdateModel(editingModel));
    setEditingModel(null);
  };

  const handleDeleteModel = (modelId) => {
    dispatch(DeleteModel(modelId));
  };

  const handleAssignModel = () => {
    //dispatch(AssignModel(selectedProduct, selectedModel));
  };

  return (
    <div className=" mx-auto p-5">
      <h2 className="text-3xl font-bold mb-8">Marka & Modelleri yönet</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Marka Ekle</h3>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Marka İsmi"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button onClick={handleAddBrand} className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600 transition duration-300">
            Marka Ekle
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Model Ekle</h3>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Model İsmi"
            value={newModel.name}
            onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <select
            value={newModel.brandId}
            onChange={(e) => setNewModel({ ...newModel, brandId: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="">Marka Seç</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.title}
              </option>
            ))}
          </select>
          <button onClick={handleAddModel} className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600 transition duration-300">
            Model Ekle
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Modelleri Ürünlere Ata</h3>
        <div className="flex items-center space-x-4">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Ürün Seç</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Model Seç</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.title}
              </option>
            ))}
          </select>
          <button onClick={handleAssignModel} className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600 transition duration-300">
            Model Ata
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Markalar</h3>
        <ul>
          {brands.map((brand) => (
            <li key={brand.id} className="flex items-center justify-between mb-2">
              {editingBrand && editingBrand.id === brand.id ? (
                <input
                  type="text"
                  value={editingBrand.title}
                  onChange={(e) => setEditingBrand({ ...editingBrand, title: e.target.value })}
                  className="border p-2 rounded w-full"
                />
              ) : (
                <span>{brand.title}</span>
              )}
              <div className="flex space-x-2">
                {editingBrand && editingBrand.id === brand.id ? (
                  <button onClick={handleUpdateBrand} className="bg-green-500 text-white p-2 rounded shadow hover:bg-green-600 transition duration-300">
                    Kaydet
                  </button>
                ) : (
                  <button onClick={() => setEditingBrand(brand)} className="bg-yellow-500 text-white p-2 rounded shadow hover:bg-yellow-600 transition duration-300">
                    Düzenle
                  </button>
                )}
                <button onClick={() => handleDeleteBrand(brand.id)} className="bg-red-500 text-white p-2 rounded shadow hover:bg-red-600 transition duration-300">
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Modeller</h3>
        <ul>
          {models.map((model) => (
            <li key={model.id} className="flex items-center justify-between mb-2">
              {editingModel && editingModel.id === model.id ? (
                <>
                  <input
                    type="text"
                    value={editingModel.name}
                    onChange={(e) => setEditingModel({ ...editingModel, name: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                  <select
                    value={editingModel.brandId}
                    onChange={(e) => setEditingModel({ ...editingModel, brandId: e.target.value })}
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Marka Seç</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.title}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <span>{model.title}</span>
              )}
              <div className="flex space-x-2">
                {editingModel && editingModel.id === model.id ? (
                  <button onClick={handleUpdateModel} className="bg-green-500 text-white p-2 rounded shadow hover:bg-green-600 transition duration-300">
                    Kaydet
                  </button>
                ) : (
                  <button onClick={() => setEditingModel(model)} className="bg-yellow-500 text-white p-2 rounded shadow hover:bg-yellow-600 transition duration-300">
                    Düzenle
                  </button>
                )}
                <button onClick={() => handleDeleteModel(model.id)} className="bg-red-500 text-white p-2 rounded shadow hover:bg-red-600 transition duration-300">
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
