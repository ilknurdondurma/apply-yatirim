import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {GetBrands,AddBrand,UpdateBrand,DeleteBrand,} from "../../../../redux/actions/brand/brandActions";
import {GetModels,AddModel,UpdateModel,DeleteModel,} from "../../../../redux/actions/model/modelActions";
import {AddCompatibleModel} from "../../../../redux/actions/compatibleModel/compatibleModelAction";
import { GetAllProducts } from "../../../../redux/actions/product/productActions";
import { ToastContainer } from "react-toastify";
import { FiSave } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function AdminModels() {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);
  const { models } = useSelector((state) => state.model);
  const { products, loading, error } = useSelector((state) => state.product);
  const theme = useSelector((state) => state.theme.theme);

  const initialModelState = { brandId: "", title: "" };
  const initialBrandState = { title: "" };
  const initialCompatibleModel = { productId: "", modelId: "" };

  const [newBrand, setNewBrand] = useState(initialBrandState);
  const [newModel, setNewModel] = useState(initialModelState);
  const [newCompatibleModel, setNewCompatibleModel] = useState(initialCompatibleModel);

  const [editingBrand, setEditingBrand] = useState(initialBrandState);
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editingModel, setEditingModel] = useState(initialModelState);
  const [editingModelId, setEditingModelId] = useState(null);

  useEffect(() => {
    dispatch(GetBrands());
    dispatch(GetModels());
    dispatch(GetAllProducts());
  }, [dispatch]);

  const handleAddBrand = async () => {
    await dispatch(AddBrand(JSON.stringify(newBrand)));
    dispatch(GetBrands());
    setNewBrand(initialBrandState);
  };
  const handleAddModel =async () => {
    console.log(JSON.stringify(newModel));
    await dispatch(AddModel(JSON.stringify(newModel)));
    dispatch(GetModels());
    setNewModel( initialModelState );

  };
  const handleDeleteBrand = async (brandId) => {
    await dispatch(DeleteBrand(brandId));
    dispatch(GetBrands());
  };
  const handleDeleteModel = async (modelId) => {
    await dispatch(DeleteModel(modelId));
    dispatch(GetModels());
  };
  const handleUpdateBrand = async() => {
    await dispatch(UpdateBrand(editingBrandId , JSON.stringify(editingBrand)));
    setEditingBrand(initialBrandState);
    dispatch(GetBrands());
  };
  const handleUpdateModel = async () => {
    await dispatch(UpdateModel(editingModelId , JSON.stringify(editingModel)));
    setEditingModel(initialModelState);
    dispatch(GetModels());
  };
  const handleAssignModel = async () => {
    await dispatch(AddCompatibleModel(JSON.stringify(newCompatibleModel)));
    setNewCompatibleModel(initialCompatibleModel);
    dispatch(GetBrands());
    dispatch(GetModels());
  };

  if (loading)
    return (
      <div className="text-center text-lg font-semibold py-10">
        Yükleniyor...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600">{error}</h1>
          <p className="text-xl mt-4 text-gray-600">
            Bir hata oluştu, lütfen daha sonra tekrar deneyin.
          </p>
        </div>
      </div>
    );

  return (
    <div className=" mx-auto p-5 flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-8">Marka & Modelleri yönet</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Marka Ekle</h3>
        <div className="flex items-center space-x-4">
          <input
            style={theme}
            type="text"
            placeholder="Marka İsmi"
            value={newBrand.title}
            onChange={(e) => setNewBrand({ ...newBrand, title: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddBrand}
            className="bg-green-500 text-white p-2 shadow hover:bg-green-600 rounded-full transition duration-300"
          >
            <IoMdAddCircleOutline size={30} />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Model Ekle</h3>
        <div className="flex items-center space-x-4">
          <input
            style={theme}
            type="text"
            placeholder="Model İsmi"
            value={newModel.title}
            onChange={(e) => setNewModel({ ...newModel, title: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <select
            style={theme}
            value={newModel.brandId}
            onChange={(e) =>setNewModel({ ...newModel, brandId: e.target.value }) }
            className="border p-2 rounded w-full"
          >
            <option value="">Marka Seç</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.title}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddModel}
            className="bg-green-500 text-white p-2 shadow hover:bg-green-600 rounded-full transition duration-300"
          >
            <IoMdAddCircleOutline size={30} />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Modelleri Ürünlere Ata</h3>
        <div className="flex items-center space-x-4">
          <select
            style={theme}
            value={newCompatibleModel.productId}
            onChange={(e) =>
              setNewCompatibleModel({
                ...newCompatibleModel,
                productId: e.target.value,
              })
            }
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
            style={theme}
            value={newCompatibleModel.modelId}
            onChange={(e) =>
              setNewCompatibleModel({
                ...newCompatibleModel,
                modelId: e.target.value,
              })
            }
            className="border p-2 rounded w-full"
          >
            <option value="">Model Seç</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.title}
              </option>
            ))}
          </select>
          <button
            onClick={handleAssignModel}
            className="bg-green-500 text-white p-2 shadow hover:bg-green-600 rounded-full transition duration-300"
          >
            <IoMdAddCircleOutline size={30} />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-center">Marka ve Modelleri Düzenle</h3>
      <div className="w-4/5 md:w-full sm:w-full mx-auto gap-5 grid grid-cols-2 sm:grid-cols-1">
        {brands.map((brand) => (
          <div key={brand.id} className="p-1 m-1">

            {/* markalar */}
          <div className="flex justify-between my-1 ">
               {/* marka adı ve inputu */}
              <div>
                {editingBrand && editingBrand.id === brand.id 
                  ? (
                    <input
                      style={theme}
                      type="text"
                      value={editingBrand.title}
                      onChange={(e) =>
                        setEditingBrand({ ...editingBrand, title: e.target.value })
                      }
                      className="border p-2 rounded w-full mb-4"
                    />
                  ) : 
                  <h3 className="text-xl font-semibold mb-4">{brand.title}</h3>
                  }
              </div>

              {/* marka butonları */}
              <div className="flex space-x-2">
                {editingBrand && editingBrand.id === brand.id 
                ? (
                  <>
                  <button
                    onClick={handleUpdateBrand}
                    className="bg-green-500 text-white p-2 rounded shadow hover:bg-green-600 transition duration-300">
                    <FiSave  />
                  </button>
                  <button
                    onClick={()=>setEditingBrand(null)}
                    className="bg-yellow-500 text-white p-2 rounded shadow hover:bg-yellow-600 transition duration-300">
                    <MdOutlineCancel />
                  </button>
                   </>    
               ) : (
                    <>
                   <button
                     onClick={() =>{
                      setEditingBrand(brand);
                      setEditingBrandId(brand.id);
                     }}
                     className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600 transition duration-300">
                     <CiEdit />
                   </button>                   
                   <button
                     onClick={() => handleDeleteBrand(brand.id)}
                     className="bg-red-500 text-white p-2 rounded shadow hover:bg-red-600 transition duration-300">
                     <MdDeleteOutline />
                 </button>
                   </>
                )}
              
              </div>
          </div>


            {/* modeller*/}
            <ul>
              {models
                .filter((model) => model.brandId === brand.id)
                .map((model) => (
                  <li
                    key={model.id}
                    className="flex items-center gap-5  mb-2 justify-between border-y-2"
                  >
                    {/* model adı ve inputu */}
                    <div>
                    {editingModel && editingModel.id === model.id ? (
                      <>
                        <input
                          style={theme}
                          type="text"
                          value={editingModel.title}
                          onChange={(e) =>
                            setEditingModel({
                              ...editingModel,
                              title: e.target.value,
                            })
                          }
                          className="border p-2 rounded w-full"
                        />
                        
                      </>
                    ) : (
                      <span>{model.title}</span>
                    )}
                    </div>


                    {/* model butonları */}
                    <div className="flex space-x-2">
                      {editingModel && editingModel.id === model.id ? (
                          <>
                         <button
                           onClick={handleUpdateModel}
                           className="bg-green-500 text-white p-2 rounded shadow hover:bg-green-600 transition duration-300">
                           <FiSave  />
                         </button>
                         <button
                           onClick={()=>setEditingModel(null)}
                           className="bg-yellow-500 text-white p-2 rounded shadow hover:bg-yellow-600 transition duration-300">
                           <MdOutlineCancel />
                         </button>
                          </>    
                      ) : (
                           <>
                          <button
                            onClick={() => {
                              setEditingModel(model);
                              setEditingModelId(model.id);
                            }}
                            className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600 transition duration-300">
                            <CiEdit />
                          </button>                   
                          <button
                            onClick={() => handleDeleteModel(model.id)}
                            className="bg-red-500 text-white p-2 rounded shadow hover:bg-red-600 transition duration-300">
                            <MdDeleteOutline />
                        </button>
                          </>
                      )}
                     
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}
