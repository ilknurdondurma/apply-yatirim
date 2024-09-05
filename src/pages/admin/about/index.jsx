import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAbouts, UpdateAbout } from '../../../redux/actions/about/aboutActions';
import { toast, ToastContainer } from 'react-toastify';

export default function AdminAbout() {
  const dispatch = useDispatch();
  const { abouts, loading, error } = useSelector((state) => state.about);
  const theme = useSelector((state) => state.theme.theme);

  const initialStateAbout = ({ title: '' , description:'' });
  const [editingAboutId, setEditingAboutId] = useState(null);
  const [editedAbout, setEditedAbout] = useState(initialStateAbout);

  useEffect(() => {
    dispatch(GetAbouts());
  }, [dispatch]);


  const handleSaveAbout = async () => {
    if (editedAbout) {
      await dispatch(UpdateAbout(editingAboutId ,JSON.stringify(editedAbout)));
      setEditingAboutId(null);
      setEditedAbout(initialStateAbout);
      dispatch(GetAbouts());
    }
  };

  const handleCancelEdit = () => {
    setEditingAboutId(null);
    setEditedAbout(initialStateAbout);
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
      <h1 className="text-2xl font-bold mb-5">Admin Hakkımızda</h1>
      <h2 className="text-xl font-semibold mb-4">Update About Page</h2>

      <div className="w-full grid grid-cols-1">
        {abouts.map((about) => (
          <div key={about.id} className="mb-4 border-[1px] p-2 rounded-lg">
            <div className="flex items-center">
              {editingAboutId === about.id ? (
                <div className="flex flex-1 items-center gap-5 p-1">
                  <input
                    style={theme}
                    type="text"
                    value={editedAbout.title}
                    onChange={(e) => setEditedAbout({ ...editedAbout, title: e.target.value })}
                    placeholder="Hakkımızda Başlığı"
                    className="border border-gray-300 rounded-lg p-2 "
                  />
                  <textarea
                    style={theme}
                    value={editedAbout.description}
                    rows={10}
                    placeholder="Hakkımızda İçeriği"
                    onChange={(e) => setEditedAbout({ ...editedAbout, description: e.target.value })}
                    className="border border-gray-300 rounded-lg flex-1 p-2"
                  />
                  <button
                    onClick={handleSaveAbout}
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
              ) : (
                <div className="grid grid-cols-5 items-center ">
                  <span className="col-span-1 text-center">{about.title}</span>
                  <span className="col-span-3">{about.description}</span>
                  <div>
                    <button
                      onClick={() => {setEditedAbout(about); setEditingAboutId(about.id)}}
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
