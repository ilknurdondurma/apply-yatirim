import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetQualities, AddQuality, UpdateQuality, DeleteQuality } from '../../../redux/actions/quality/qualityActions';
import { ToastContainer } from 'react-toastify';

export default function AdminQuality() {
  const dispatch = useDispatch();
  const { qualities, loading, error } = useSelector((state) => state.quality);
  const theme = useSelector((state) => state.theme.theme);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingQualityId, setEditingQualityId] = useState(null);
  const [editedQuality, setEditedQuality] = useState({ id: null, title: "", description: "", imageUrl: "" });

  useEffect(() => {
    dispatch(GetQualities());
  }, [dispatch]);

  const handleSaveQuality = async () => {
    if (editedQuality) {
      const qualityRequest = new FormData();
      console.log(editedQuality)
      console.log(editingQualityId)
      qualityRequest.append('data', JSON.stringify(editedQuality));
      if (selectedFile) {
        qualityRequest.append('imageUrl', selectedFile);
      }
     
        await dispatch(UpdateQuality(editingQualityId , qualityRequest));
   
      setEditingQualityId(null);
      setEditedQuality({ id: null, title: "", description: "", imageUrl: "" });
      dispatch(GetQualities());
    }
  };

  const handleCancelEdit = () => {
    setEditingQualityId(null);
    setEditedQuality({ id: null, title: "", description: "", imageUrl: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedQuality((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
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
    <div className="pt-6 max-w-4xl mx-auto gap-10">
      <h1 className="text-2xl font-bold mb-5">Admin Kalite Yönetimi</h1>
      <h2 className="text-xl font-semibold mb-4">
        {editingQualityId ? "Kaliteyi Güncelle" : "Yeni Kalite Ekle"}
      </h2>

      <div className="w-full grid grid-cols-1">
        {qualities.map((quality) => (
          <div key={quality.id} className="mb-4 border-[1px] p-2 rounded-lg">
            <div className="flex items-center">
              {editingQualityId === quality.id ? (
                <div className="grid grid-cols-5 items-center gap-5 p-1">
                  <input
                    style={theme}
                    type="text"
                    value={editedQuality.title}
                    onChange={(e) => setEditedQuality({ ...editedQuality, title: e.target.value })}
                    placeholder="Kalite Başlığı"
                    className="border border-gray-300 rounded-lg p-2"
                  />
                  <textarea
                    style={theme}
                    value={editedQuality.description}
                    rows={10}
                    placeholder="Kalite İçeriği"
                    onChange={(e) => setEditedQuality({ ...editedQuality, description: e.target.value })}
                    className="col-span-2 border border-gray-300 rounded-lg flex-1 p-2"
                  />
                  <input
                    style={theme}
                    type="file"
                    onChange={handleFileChange}
                    className="col-span-1 border p-2 rounded w-full mb-2"
                  />
                  <div className="col-span-1">
                    <button
                      onClick={handleSaveQuality}
                      className="bg-green-500 py-1 px-4 rounded-lg hover:bg-green-600 mr-2"
                    >
                      Kaydet
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-300 py-1 px-4 rounded-lg hover:bg-gray-400"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-5 items-center gap-5">
                  <span className="col-span-1 text-center">{quality.title}</span>
                  <span className="col-span-2">{quality.description}</span>
                  <div>
                    {quality.imageUrl && <img src={`data:image/jpeg;base64,${quality.imageUrl}`} alt="Kalite Resmi" className="col-span-1"/>}
                  </div>
                  <div>
                    <button
                      onClick={() => { setEditedQuality(quality); setEditingQualityId(quality.id); }}
                      className="bg-yellow-500 py-1 px-4 rounded-lg hover:bg-yellow-600 mr-2"
                    >
                      Düzenle
                    </button>
                    
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}
