import React, { useEffect, useState } from "react";
import { AnimateContainer } from "react-animate-container";
import ProductCard from "../../../../components/card";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts, DeleteProduct, UpdateProduct } from "../../../../redux/actions/product/productActions";
import { toast, ToastContainer } from "react-toastify";
import { MdDelete, MdEdit } from "react-icons/md";

const AdminProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const initialProductState = {
    id: null,
    title: "",
    description: "",
    price: null,
    stock: null,
    categoryId: null,
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: ""
  };
  const [editedProduct, setEditedProduct] = useState(initialProductState);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedFiles, setSelectedFiles] = useState({ imageUrl1: null, imageUrl2: null, imageUrl3: null });
  function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
  }
  useEffect(() => {
    deleteCookie('sectorId');
  },)
  useEffect(() => {
    dispatch(GetAllProducts());
  }, [dispatch]);

  const handleDelete = async (productName ,id) => {
    if (window.confirm(`${productName} silinecektir ve işlem geri alınamayacaktır. Devam etmek istiyor musunuz?`)) {
      try {
        await dispatch(DeleteProduct(id));
        dispatch(GetAllProducts());
      } catch (error) {
        console.error('Ürün silinemedi:', error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedProduct(product);
    setShowModal(true); // Open modal
  };

  const handleFileChange = (e, imageKey) => {
    const file = e.target.files[0];
    setSelectedFiles((prev) => ({ ...prev, [imageKey]: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct((prev) => ({ ...prev, [imageKey]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleEditSubmit = async (e) => {
    e.preventDefault(); 
    if (editedProduct) {
      const productRequest = new FormData();
      productRequest.append('data', JSON.stringify(editedProduct));
      
      if (selectedFiles.imageUrl1) {
        productRequest.append('imageUrl1', selectedFiles.imageUrl1);
      }
      if (selectedFiles.imageUrl2) {
        productRequest.append('imageUrl2', selectedFiles.imageUrl2);
      }
      if (selectedFiles.imageUrl3) {
        productRequest.append('imageUrl3', selectedFiles.imageUrl3);
      }
      console.log(editedProduct)
      console.log("resim1 : " + selectedFiles.imageUrl1)
      console.log("resim2 : " +selectedFiles.imageUrl2)
      console.log("resim3 : " +selectedFiles.imageUrl3)
      try {
        await dispatch(UpdateProduct(editingProductId, productRequest));
        await dispatch(GetAllProducts());
        setShowModal(false);
        toast.success("Ürün başarıyla güncellendi!");
        setEditingProductId(null);
        setEditedProduct(initialProductState);
        setSelectedFiles({ imageUrl1: null, imageUrl2: null, imageUrl3: null });
        
      } catch (error) {
        console.error('Ürün güncellenirken bir hata oluştu:', error);
      }
    }
  };

  if (loading)
    return <div className="text-center text-lg font-semibold py-10">Yükleniyor...</div>;

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600">{error}</h1>
          <p className="text-xl mt-4 text-gray-600">Bir hata oluştu, lütfen daha sonra tekrar deneyin.</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <section className="flex flex-col text-center my-5">
        <h2 className="text-2xl font-bold mb-8">Ürünler</h2>
        <div className="grid grid-cols-4 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-5 justify-center mx-auto">
          {Array.isArray(products) && products.length > 0 
            ? products.map((product, index) => (
                <div key={index}>
                  <AnimateContainer.fadeIn duration={1}>
                    <ProductCard product={product} />
                  </AnimateContainer.fadeIn>
                  <div className="flex justify-start m-1 gap-5 ">
                    <MdDelete size={25} onClick={() => { setSelectedProductId(product.id); handleDelete(product.title , product.id); }} />
                    <MdEdit size={25} onClick={() => handleEdit(product)} />
                  </div>
                </div>
              ))
            : <p>No products available</p>}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 md:w-1/2 sm:w-full m-5">
            <h3 className="text-xl font-semibold mb-4">Ürünü Güncelle</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Başlık</label>
                <input
                  type="text"
                  value={editedProduct.title}
                  onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Açıklaması</label>
                <input
                  type="text"
                  value={editedProduct.description}
                  onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Fiyat</label>
                <input
                  type="text"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Stok</label>
                <input
                  type="text"
                  value={editedProduct.stock}
                  onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Kategori</label>
                <input
                  type="text"
                  value={editedProduct.categoryId}
                  onChange={(e) => setEditedProduct({ ...editedProduct, categoryId: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                {['imageUrl1', 'imageUrl2', 'imageUrl3'].map((imageKey) => (
                  <div key={imageKey} className="mb-4">
                    <label className="block text-gray-700">Resim {imageKey.slice(-1)}</label>
                    <input type="file" onChange={(e) => handleFileChange(e, imageKey)} />
                    {editedProduct[imageKey] && (
                      <>
                        {/* Base64 formatında olup olmadığını kontrol ediyoruz */}
                        {editedProduct[imageKey].startsWith('data:image') ? (
                          <img 
                            src={editedProduct[imageKey]}
                            alt={`Resim ${imageKey.slice(-1)}`} 
                            className="mt-2 h-32 w-full sm:w-1/2"
                          />
                        ) : (
                          <img 
                            src={`data:image/jpeg;base64,${editedProduct[imageKey]}`}
                            alt={`Resim ${imageKey.slice(-1)}`}
                            className="mt-2 h-32 w-full sm:w-1/2 md:w-1/2"
                          />
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Kapat</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Güncelle</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminProductList;
