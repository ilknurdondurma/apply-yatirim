import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCategories } from "../../../../redux/actions/category/categoryActions";
import { AddProduct } from "../../../../redux/actions/product/productActions";
import { toast, ToastContainer } from "react-toastify";


const AdminAddProduct = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const initialProductState = {
    title: "",
    description: "",
    price: null,
    stock: null,
    categoryId: null,
  };
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [selectedFiles, setSelectedFiles] = useState({ imageUrl1: null, imageUrl2: null, imageUrl3: null });

  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);

  if (loading) return <div className="text-center text-lg font-semibold py-10">Yükleniyor...</div>;

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">{error}</h1>
        <p className="text-xl mt-4 text-gray-600">Bir hata oluştu, lütfen daha sonra tekrar deneyin.</p>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productRequest = new FormData();
    productRequest.append('data', JSON.stringify(newProduct));
    console.log(productRequest)

    // Append files
    if (selectedFiles.imageUrl1) {
      productRequest.append('imageUrl1', selectedFiles.imageUrl1);
    }
    if (selectedFiles.imageUrl2) {
      productRequest.append('imageUrl2', selectedFiles.imageUrl2);
    }
    if (selectedFiles.imageUrl3) {
      productRequest.append('imageUrl3', selectedFiles.imageUrl3);
    }
     console.log(newProduct)
    console.log("resim1 : " + selectedFiles.imageUrl1)
    console.log("resim2 : " +selectedFiles.imageUrl2)
    console.log("resim3 : " +selectedFiles.imageUrl3)
    
    try {
      await dispatch(AddProduct(productRequest));
      setNewProduct(initialProductState);
      setSelectedFiles({ imageUrl1: null, imageUrl2: null, imageUrl3: null });
      toast.success("Ürün başarıyla eklendi!");
    } catch (error) {
      console.error('Ürün eklenirken bir hata oluştu:', error);
      alert("Ürün eklenirken bir hata oluştu.");
    }
  };

  const handleFileChange = (e, imageKey) => {
    const file = e.target.files[0];
    setSelectedFiles((prev) => ({ ...prev, [imageKey]: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, [imageKey]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: "20px" }} className="flex flex-col ">
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full m-5">
          <h3 className="text-xl font-semibold mb-4">Ürün Ekle</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Başlık</label>
              <input
                type="text"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Açıklama</label>
              <input
                type="text"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fiyat</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Stok</label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <select
              value={newProduct.categoryId}
              onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
              className="mb-4 border border-gray-300 rounded-lg p-2 w-1/2"
              required
            >
              <option value="">Kategori Seçin</option>
              {categories.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.title}
                </option>
              ))}
            </select>
            <div className="w-1/2 md:w-full sm:w-full grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
              {['imageUrl1', 'imageUrl2', 'imageUrl3'].map((imageKey) => (
                <div key={imageKey} className="mb-4">
                  <label className="block text-gray-700">Resim {imageKey.slice(-1)}</label>
                  <input type="file" onChange={(e) => handleFileChange(e, imageKey)} />
                  {newProduct[imageKey] && (
                    <img
                      src={newProduct[imageKey]}
                      alt={`Resim ${imageKey.slice(-1)}`}
                      className="mt-2 h-32 w-full"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Ekle</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminAddProduct;
