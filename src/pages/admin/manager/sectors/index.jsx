import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddSector, DeleteSector, GetSectors, UpdateSector } from '../../../../redux/actions/sector/sectorActions';
import { toast } from 'react-toastify';

function AdminSectors() {
  const dispatch = useDispatch();
  const { sectors, loading, error } = useSelector(state => state.sector);
  const theme = useSelector(state => state.theme.theme);
  
  const initialSectorState = { title: '', description: '' };
  const initialSectorImageState = { imageUrl1: null, imageUrl2: null };
  
  // State for adding a new sector
  const [newSector, setNewSector] = useState(initialSectorState);
  const [selectedFiles, setSelectedFiles] = useState(initialSectorImageState);
  
  // State for editing an existing sector
  const [editingSectorId, setEditingSectorId] = useState(null);
  const [editedSector, setEditedSector] = useState(initialSectorState);

  useEffect(() => {
    dispatch(GetSectors());
  }, [dispatch]);

  const handleAdd = async () => {
    if (!selectedFiles.imageUrl1 || !selectedFiles.imageUrl2) {
        alert("Lütfen her iki resmi de yükleyin.");
        return; // Prevent further execution if files are not selected
      }
    const sectorRequest = new FormData();
    sectorRequest.append('data', JSON.stringify(newSector));
    
    // Append images if selected
    if (selectedFiles.imageUrl1) {
      sectorRequest.append('imageUrl1', selectedFiles.imageUrl1);
    }
    if (selectedFiles.imageUrl2) {
      sectorRequest.append('imageUrl2', selectedFiles.imageUrl2);
    }
    console.log(newSector)
    console.log("resim1 : " + selectedFiles.imageUrl1)
    console.log("resim2 : " +selectedFiles.imageUrl2)
    console.log("fd : " +sectorRequest)

    try {
      await dispatch(AddSector(sectorRequest));
      setNewSector(initialSectorState);
      setSelectedFiles(initialSectorImageState);
      toast.success("Sektör başarıyla eklendi!");
    } catch (error) {
      console.error('Sektör eklenirken bir hata oluştu:', error);
      toast.error("Sektör eklenirken bir hata oluştu.");
    }

    dispatch(GetSectors());
  };

  const handleEditSector = async () => {
    if (editedSector) {
      const sectorRequest = new FormData();
      sectorRequest.append('data', JSON.stringify(editedSector));
      
      if (selectedFiles.imageUrl1) {
        sectorRequest.append('imageUrl1', selectedFiles.imageUrl1);
      }
      if (selectedFiles.imageUrl2) {
        sectorRequest.append('imageUrl2', selectedFiles.imageUrl2);
      }
      console.log(editedSector)
      console.log("resim1 : " + selectedFiles.imageUrl1)
      console.log("resim2 : " + selectedFiles.imageUrl2)
      console.log("fd : " +sectorRequest)

      try {
        await dispatch(UpdateSector(editingSectorId , sectorRequest));
        await dispatch(GetSectors());
        setEditedSector(initialSectorState);
        setSelectedFiles(initialSectorImageState);
        setEditingSectorId(null);
        toast.success("Sektör başarıyla güncellendi!");
      } catch (error) {
        console.error('Sektör güncellenirken bir hata oluştu:', error);
        toast.error("Sektör güncellenirken bir hata oluştu.");
      }

      dispatch(GetSectors());
    }
  };

  const handleFileChange = (e, imageKey) => {
    const file = e.target.files[0];
    setSelectedFiles((prev) => ({ ...prev, [imageKey]: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedSector((prev) => ({ ...prev, [imageKey]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Bu sektörü silmek istediğinizden emin misiniz? Onayladığınızda ona ait tüm ürün , kategori, katalog ve hizmetler silinecektir.");
    if (isConfirmed) {
        await dispatch(DeleteSector(id));
        dispatch(GetSectors());
        console.log(id);
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
    <div className="max-w-4xl p-6 grid grid-cols-1 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sektörler</h1>

      {/* Add Sector Form */}
      <div className={`${editingSectorId ? "hidden" : "block"} mb-6 flex flex-col gap-2 border-2 p-5 rounded-xl`}>
        <div className='flex justify-start md:flex-col sm:flex-col gap-2'>
            <input
            style={theme}
            type="text"
            value={newSector.title}
            onChange={(e) => setNewSector({ ...newSector, title: e.target.value })}
            placeholder="Yeni sektör adı"
            className="border border-gray-300 rounded-lg p-2 mr-4 flex-1"
            required
            />
            <textarea
            style={theme}
            value={newSector.description}
            onChange={(e) => setNewSector({ ...newSector, description: e.target.value })}
            placeholder="Sektör Açıklaması"
            rows={1}
            className="border border-gray-300 rounded-lg p-2 mr-4 flex-1"
            required
            />
        </div>
        <div className='flex md:flex-col sm:flex-col'>
            {["imageUrl1", "imageUrl2"].map((imageKey) => (
                <div key={imageKey} className="mb-4">
                    <label className="block text-gray-700">Resim {imageKey.slice(-1)}</label>
                    <input
                        type="file"
                        required
                        onChange={(e) => handleFileChange(e, imageKey)}
                    />
                    {selectedFiles[imageKey] && (
                        <img
                        src={URL.createObjectURL(selectedFiles[imageKey])}
                        alt={`Resim ${imageKey.slice(-1)}`}
                        className="mt-2 h-32 w-full"
                        />
                    )}
                </div>
            ))}
        </div>

        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Sektör Ekle
        </button>
      </div>

      {/* Sector List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Sektörler</h2>
        {sectors.slice().reverse().map(sector => (
          <div key={sector.id} className="mb-4 border-[1px] p-5 rounded-lg">
            <div className="flex items-center">
              {editingSectorId === sector.id ? (
                <div className="w-full flex flex-col">
                    <div className='flex flex-col gap-2'>
                        <input
                            style={theme}
                            type="text"
                            placeholder='Başlık'
                            value={editedSector.title}
                            onChange={(e) => setEditedSector({ ...editedSector, title: e.target.value })}
                            className="border border-gray-300 rounded-lg p-2 mr-4 "
                        />
                        <textarea
                            style={theme}
                            value={editedSector.description}
                            placeholder='Açıklama'
                            onChange={(e) => setEditedSector({ ...editedSector, description: e.target.value })}
                            className="border border-gray-300 rounded-lg p-2 mr-4"
                        />
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                        {['imageUrl1', 'imageUrl2'].map((imageKey) => (
                        <div key={imageKey} className="mb-4">
                            <label className="block text-gray-700">Resim {imageKey.slice(-1)}</label>
                            <input type="file" onChange={(e) => handleFileChange(e, imageKey)} />
                            {selectedFiles[imageKey] ? (
                                <img 
                                    src={URL.createObjectURL(selectedFiles[imageKey])}
                                    alt={`Resim ${imageKey.slice(-1)}`} 
                                    className="mt-2 h-32 w-full"
                                />
                            ) : (
                                sector[imageKey] && (
                                    <img 
                                        src={`data:image/jpeg;base64,${sector[imageKey]}`}
                                        alt={`Resim ${imageKey.slice(-1)}`} 
                                        className="mt-2 h-32 w-full "
                                    />
                                )
                            )}
                        </div>
                        ))}
                    </div>
                    <div className='flex justify-center mt-4'>
                        <button 
                            onClick={handleEditSector}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-2"
                        >
                            Güncelle
                        </button>
                        <button 
                            onClick={() => setEditingSectorId(null)}
                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                        >
                            İptal
                        </button>
                    </div>
                </div>
              ) : (
                <div className="w-full flex md:flex-col sm:flex-col justify-between">
                  <div className='flex md:flex-col sm:flex-col justify-between gap-2'>
                    <div className='flex  sm:flex-col gap-5 m-2'>
                        {sector.imageUrl1 && <img src={`data:image/jpeg;base64,${sector.imageUrl1}`} alt="Sector Img" className="w-20 sm:w-full h-20 object-cover  mb-2" />}
                        {sector.imageUrl2 && <img src={`data:image/jpeg;base64,${sector.imageUrl2}`} alt="Sector Img" className="w-20 sm:w-full h-20 object-cover  mb-2" />}
                    </div>
                    <div className='flex flex-col'>
                        <h3 className="text-lg font-semibold">{sector.title}</h3>
                        <p>{sector.description}</p>
                    </div>
                    
                  </div>
                  <div className='flex justify-end items-center gap-2'>
                    <button
                      onClick={() => {
                        setEditingSectorId(sector.id);
                        setEditedSector(sector);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white h-1/2 py-2 px-4 rounded-lg mr-2 flex items-center "
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(sector.id)}
                      className="bg-red-500 hover:bg-red-600 text-white h-1/2 py-2 px-4 rounded-lg mr-2 flex items-center "
                    >
                      Sil
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSectors;
