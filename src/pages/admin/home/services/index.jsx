import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServices, AddService, UpdateService, DeleteService } from '../../../../redux/actions/service/serviceActions';
import InlineEdit from '../../../../components/inline-edit';
import { grayDarkTheme, grayLightTheme, lightTheme } from '../../../../redux/reducers/theme/themeReducers';

const AdminServices = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);
  const theme=useSelector((state)=>state.theme.theme);
  useEffect(() => {
    dispatch(GetServices());
  }, [dispatch]);

  const handleSave = (service) => {
    dispatch(UpdateService(service.id, service));
  };

  const handleDelete = (id) => {
    dispatch(DeleteService(id));
  };
 
  const [newService, setNewService] = useState({ title: '', description: '', videoUrl: '' });

  const handleAdd = () => {
    dispatch(AddService(newService));
    setNewService({ title: '', description: '', videoUrl: '' });
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
        <div className="border p-4 rounded-lg bg-white shadow-md "
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
          <input
            type="text"
            placeholder="Video URL (optional)"
            value={newService.videoUrl}
            onChange={(e) => setNewService({ ...newService, videoUrl: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Service
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <InlineEdit key={service.id} item={service} onSave={handleSave} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
