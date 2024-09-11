import React, { useEffect, useState } from "react";
import { AnimateContainer } from "react-animate-container";
import CatalogItem from "../../../../components/catalog";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCatalog, GetCatalogs, UpdateCatalog } from "../../../../redux/actions/catalog/catalogActions";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { downloadCatalog } from "../../../../api";

const AdminCatalogList = () => {
  const dispatch = useDispatch();
  const { catalogs, loading, error } = useSelector((state) => state.catalog);
  const [selectedCatalogId, setSelectedCatalogId] = useState(null);
  const initialCatalogState = { id: null, title: "", description: "", file: null };
  const [editedCatalog, setEditedCatalog] = useState(initialCatalogState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(GetCatalogs());
  }, [dispatch]);

  const handleDelete = async (id, catalogName) => {
    if (window.confirm(`${catalogName} silinecektir ve işlem geri alınamayacaktır. Devam etmek istiyor musunuz?`)) {
      try {
        await dispatch(DeleteCatalog(id));
        dispatch(GetCatalogs());
      } catch (error) {
        console.error('Katalog silinemedi:', error);
      }
    }
  };

  const handleEdit = (catalog) => {
    setSelectedCatalogId(catalog.id);
    setEditedCatalog(catalog);
    setShowModal(true);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setEditedCatalog({ ...editedCatalog, file });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editedCatalog) {
      const catalogRequest = new FormData();
      const catalogData = {
        title: editedCatalog.title,
        description: editedCatalog.description,
      };
      catalogRequest.append("data", JSON.stringify(catalogData));
      if (selectedFile) {
        catalogRequest.append("file", selectedFile);
      }
      console.log(catalogData);
      console.log(selectedFile);
      console.log(catalogRequest)


      try {
        await dispatch(UpdateCatalog(selectedCatalogId, catalogRequest));
        await dispatch(GetCatalogs());
        setSelectedCatalogId(null);
        setEditedCatalog(initialCatalogState);
        setSelectedFile(null);
        setShowModal(false);
      } catch (error) {
        console.error("Ürün güncellenirken bir hata oluştu:", error);
      }
    }
  };

  const handleDownload = async (id, fileName) => {
    try {
      const response = await downloadCatalog(id);
      const blob = await response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Dosya indirilirken bir hata oluştu", error);
    }
  };

  return (
    <div style={{ padding: "20px" }} className="flex-col justify-center items-center grid grid-cols-1">
      <section className="flex flex-col text-center my-5">
        <h2 className="text-2xl font-bold mb-8">Kataloglar</h2>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-5">
          {Array.isArray(catalogs) && catalogs.length > 0
            ? catalogs.map((catalog) => (
              <div key={catalog.id}>
                <AnimateContainer.fadeIn duration={1}>
                  <CatalogItem catalog={catalog} />
                </AnimateContainer.fadeIn>
                <div className="flex justify-start m-1 gap-5">
                  <MdDelete size={25} onClick={() => handleDelete(catalog.id, catalog.title)} />
                  <MdEdit size={25} onClick={() => handleEdit(catalog)} />
                  <button
                    onClick={() => handleDownload(catalog.id, catalog.fileName)}
                    className="text-blue-500"
                  >
                    Dosya İndir
                  </button>
                </div>
              </div>
            ))
            : <p>No catalogs available</p>}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 md:w-1/2 sm:w-full m-5">
            <h3 className="text-xl font-semibold mb-4">Kataloğu Güncelle</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Başlık</label>
                <input
                  type="text"
                  value={editedCatalog.title}
                  onChange={(e) => setEditedCatalog({ ...editedCatalog, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Açıklaması</label>
                <input
                  type="text"
                  value={editedCatalog.description}
                  onChange={(e) => setEditedCatalog({ ...editedCatalog, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>   
              <div className="mb-4">
                <label className="block text-gray-700">Katalog</label>
                <input type="file" onChange={handleFileChange} />
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

export default AdminCatalogList;
