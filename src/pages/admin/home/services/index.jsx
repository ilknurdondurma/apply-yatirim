import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServices, AddService, UpdateService, DeleteService } from '../../../../redux/actions/service/serviceActions';
import { grayDarkTheme, grayLightTheme, lightTheme } from '../../../../redux/reducers/theme/themeReducers';
import { ToastContainer } from 'react-toastify';

const AdminServices = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editableItem, setEditableItem] = useState({ title: '', description: '',});
  const [newService, setNewService] = useState({ title: '', description: ''});
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(GetServices());
  }, [dispatch]);

  const handleSave = async () => {
    if (editableItem) {
      await dispatch(UpdateService(editingServiceId, editableItem));
      dispatch(GetServices());
      setEditingServiceId(null);
      setEditableItem({ title: '', description: ''});
    }
  };

  const handleDelete = (id) => {
    dispatch(DeleteService(id));
    dispatch(GetServices());
  };

  const handleEdit = (service) => {
    setEditingServiceId(service.id);
    setEditableItem({ title: service.title, description: service.description});
  };

  const handleCancel = () => {
    setEditingServiceId(null);
    setEditableItem({ title: '', description: ''});
  };

  const handleAdd = async () => {
      await dispatch(AddService(newService))
      dispatch(GetServices());
      setNewService({ title: '', description: ''});
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
    <div className="p-5 grid grid-cols-1">
      <h1 className="text-2xl font-bold mb-5">Admin Services</h1>

      <div className="space-y-4 mb-5">
        <h2 className="text-xl font-bold mb-2">Add New Service</h2>
        <div className="border p-4 rounded-lg bg-white shadow-md"
          style={theme === lightTheme ? null : grayDarkTheme}
        >
          <input
            type="text"
            placeholder="Title"
            value={newService.title}
            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <textarea
            placeholder="Description"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Service
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {services.slice().reverse().map((service) => (
          <div
            key={service.id}
            className="w-full border p-4 rounded-lg shadow-md bg-white mb-4 flex justify-center items-center self-center mx-auto"
            style={theme === lightTheme ? grayLightTheme : grayDarkTheme}
          >
            {editingServiceId === service.id ? (
              <div className="w-full">
                <input
                  type="text"
                  value={editableItem.title}
                  onChange={(e) => setEditableItem({ ...editableItem, title: e.target.value })}
                  className="border p-2 rounded w-full mb-2"
                  style={theme === lightTheme ? null : grayLightTheme}
                />
                <textarea
                  value={editableItem.description}
                  rows={4}
                  onChange={(e) => setEditableItem({ ...editableItem, description: e.target.value })}
                  className="border p-2 rounded w-full mb-2"
                  style={theme === lightTheme ? null : grayLightTheme}
                />
              
                <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                  Save
                </button>
                <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            ) : (
              <div className="w-full">
                <div className="text-xl font-bold line-clamp-1">{service.title}</div>
                <div className='line-clamp-2'>{service.description}</div>
              
                <button onClick={() => handleEdit(service)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(service.id)} className="bg-red-500 text-white px-4 py-2 rounded ml-4">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminServices;
