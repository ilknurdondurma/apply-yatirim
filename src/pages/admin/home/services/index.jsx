import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, addServicee, updateServicee, deleteServicee } from '../../../../redux/actions/service/serviceActions';
import InlineEdit from '../../../../components/inline-edit'; // adjust the import path as necessary

const AdminServices = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleSave = (service) => {
    dispatch(updateServicee(service.id, service));
  };

  const handleDelete = (id) => {
    dispatch(deleteServicee(id));
  };

  const [newService, setNewService] = useState({ title: '', description: '' });

  const handleAdd = () => {
    dispatch(addServicee(newService));
    setNewService({ title: '', description: '' });
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Admin Services</h1>

      <div className="space-y-4 mb-5">
        <h2 className="text-xl font-bold mb-2">Add New Service</h2>
        <div className="border p-4 rounded-lg bg-white shadow-md">
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
        {services.map((service, index) => (
          <InlineEdit key={service.id} item={service} onSave={handleSave} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
