import React, { useEffect, useState } from "react";
import { GetSectors } from "../../../../redux/actions/sector/sectorActions";
import { useDispatch, useSelector } from "react-redux";
import { AddCatalog } from "../../../../redux/actions/catalog/catalogActions";
import { toast, ToastContainer } from "react-toastify";

export default function AdminAddCatalog() {
  const dispatch = useDispatch();
  const { sectors, loading, error } = useSelector((state) => state.sector);
  const initialCatalogState = {
    title: "",
    description: "",
    sectorId: null,
  };
  const [newCatalog, setNewCatalog] = useState(initialCatalogState);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    dispatch(GetSectors());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini önlemek için
    console.log(JSON.stringify(newCatalog));
    console.log(selectedFile);

    try {
      const catalogRequest = new FormData();
      const catalogData = {
        title: newCatalog.title,
        description: newCatalog.description,
        sectorId:newCatalog.sectorId
      };
      catalogRequest.append("data", JSON.stringify(catalogData));
      catalogRequest.append("file", selectedFile);

      try {
        await dispatch(AddCatalog(catalogRequest));
        toast.success("Katalog başarıyla eklendi!");
      } catch (error) {
        toast.error("Katalog ekleme işlemi başarısız");
      }
    } catch (error) {
      alert("Katalog ekleme işlemi başarısız oldu.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div style={{ padding: "20px" }} className="flex flex-col ">
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full m-5">
          <h3 className="text-xl font-semibold mb-4">Catalog Ekle</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Başlık</label>
              <input
                type="text"
                placeholder="x kataloğu"
                value={newCatalog.title}
                onChange={(e) => setNewCatalog({ ...newCatalog, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Açıklama</label>
              <input
                type="text"
                placeholder="x içeren katalog"
                value={newCatalog.description}
                onChange={(e) => setNewCatalog({ ...newCatalog, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <select
              value={newCatalog.sectorId}
              onChange={(e) => setNewCatalog({ ...newCatalog, sectorId: e.target.value })}
              className="mb-4 border border-gray-300 rounded-lg p-2 w-1/2"
              required
            >
              <option value="">Sektör Seçin</option>
              {sectors.map((type) => (
                <option 
                  key={type.id} 
                  value={type.id} 
                  >
                    {type.title}
                </option>
              ))}
            </select>
            <div className="w-1/2 md:w-full sm:w-full grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
              <div className="mb-4">
                <input type="file" onChange={handleFileChange} required />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
