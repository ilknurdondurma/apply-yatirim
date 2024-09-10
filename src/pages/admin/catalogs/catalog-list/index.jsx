import React, { useEffect, useState } from "react";
import { AnimateContainer } from "react-animate-container";
import CatalogItem from "../../../../components/catalog";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCatalog, GetCatalogs, UpdateCatalog } from "../../../../redux/actions/catalog/catalogActions";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const AdminCatalogList = () => {
  const dispatch = useDispatch();
  const { catalogs, loading, error } = useSelector((state) => state.catalog);
  const [selectedCatalogId, setSelectedCatalogId] = useState(null);
  const initialCatalogState = { id: null, title: "", description: "" };
  const [editedCatalog, setEditedCatalog] = useState(initialCatalogState);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    dispatch(GetCatalogs());
  }, [dispatch]);

  const handleDelete = async (catalogName) => {
    if (window.confirm(`${catalogName} silinecektir ve işlem geri alınamayacaktır. Devam etmek istiyor musunuz?`)) {
      try {
        await dispatch(DeleteCatalog(selectedCatalogId));
        dispatch(GetCatalogs());
      } catch (error) {
        console.error('Katalog silinemedi:', error);
      }
    }
  };

  const handleEdit = (catalog) => {
    setSelectedCatalogId(catalog.id);
    setEditedCatalog(catalog);
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
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editedCatalog && selectedFile) {
      const catalogRequest = new FormData();
      catalogRequest.append("data", JSON.stringify(editedCatalog));
      catalogRequest.append("file", selectedFile);

      try {
        await dispatch(UpdateCatalog(selectedCatalogId, catalogRequest));
        await dispatch(GetCatalogs());
        toast.success("Katalog başarıyla güncellendi!");
        setSelectedCatalogId(null);
        setEditedCatalog(initialCatalogState);
        setSelectedFile(null);
      } catch (error) {
        console.error("Ürün güncellenirken bir hata oluştu:", error);
      }
    }
  };

  const handleDownload = (fileData, fileName) => {
    const link = document.createElement("a");
    link.href = fileData;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "20px" }} className="flex-col justify-center items-center grid grid-cols-1">
      <sections className="flex flex-col text-center my-5">
        <h2 className="text-2xl font-bold mb-8">Kataloglar</h2>
        <div className="grid grid-cols-1 gap-5">
          {Array.isArray(catalogs) && catalogs.length > 0
            ? catalogs.map((catalog, index) => (
              <div key={catalog.id}>
                <AnimateContainer.fadeIn duration={1}>
                  <CatalogItem catalog={catalog} />
                </AnimateContainer.fadeIn>
                <div className="flex justify-start m-1 gap-5">
                  <MdDelete size={25} onClick={() => handleDelete(catalog.title)} />
                  <MdEdit size={25} onClick={() => handleEdit(catalog)} />
                  <button
                    onClick={() => handleDownload(catalog.fileData, catalog.fileName)}
                    className="text-blue-500"
                  >
                    Dosya İndir
                  </button>
                </div>
              </div>
            ))
            : <p>No catalogs available</p>}
        </div>
      </sections>

      {selectedCatalogId && (
        <form onSubmit={handleEditSubmit} className="my-5">
          <input type="text" value={editedCatalog.title} onChange={(e) => setEditedCatalog({ ...editedCatalog, title: e.target.value })} />
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Güncelle</button>
        </form>
      )}
    </div>
  );
};

export default AdminCatalogList;
