import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { GetUsers} from '../../../../redux/actions/user/userActions';
import { ToastContainer } from 'react-toastify';

export default function AdminUsers() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.user);

  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: '', email: '' });

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  const handleAddUser = async () => {
    try {
      const response = await axios.post('/api/users', newUser);
      //dispatch(addUser(response.data));
      setNewUser({ name: '', email: '' });
    } catch (error) {
      console.error('Kullanıcı eklenemedi:', error);
    }
  };

  const handleEditUser = async (id) => {
    try {
      const response = await axios.put(`/api/users/${id}`, editedUser);
     // dispatch(updateUser(response.data));
      setEditingUserId(null);
      setEditedUser({ name: '', email: '' });
    } catch (error) {
      console.error('Kullanıcı düzenlenemedi:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Bu kullanıcı silinecektir. Devam etmek istiyor musunuz?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        //dispatch(deleteUser(id));
      } catch (error) {
        console.error('Kullanıcı silinemedi:', error);
      }
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Kullanıcılar</h1>

      <div className="mb-6 flex flex-col">
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Kullanıcı adı"
          className="border border-gray-300 rounded-lg p-2 mb-2"
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="E-posta"
          className="border border-gray-300 rounded-lg p-2 mb-4"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg "
        >
          Kullanıcı Ekle
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Mevcut Kullanıcılar</h2>
        {users.map(user => (
          <div key={user.id} className="mb-4">
            <div className="flex items-center">
              {editingUserId === user.id ? (
                <div className="flex items-center flex-1">
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    className="border border-gray-300 rounded-lg p-2 mr-4 flex-1"
                  />
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    className="border border-gray-300 rounded-lg p-2 mr-4 flex-1"
                  />
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mr-2"
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => setEditingUserId(null)}
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                  >
                    İptal
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <p><strong>Ad:</strong> {user.name}</p>
                    <p><strong>E-posta:</strong> {user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingUserId(user.id);
                      setEditedUser({ name: user.name, email: user.email });
                    }}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 mr-2"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                    Sil
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
