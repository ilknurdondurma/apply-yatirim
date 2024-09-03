import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetQualities, AddQuality, UpdateQuality, DeleteQuality } from "../../../redux/actions/quality/qualityActions";
import InlineEdit from "../../../components/inline-edit";
import { grayDarkTheme, lightTheme } from "../../../redux/reducers/theme/themeReducers";
import { ToastContainer } from "react-toastify";

const initialQualitySection = { id: null, title: "", description: "", image: null };

const AdminQuality = () => {
  const dispatch = useDispatch();
  const { qualities, loading, error } = useSelector((state) => state.quality);
  const [localQualities, setLocalQualities] = useState([]);
  const [formData, setFormData] = useState(initialQualitySection);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(GetQualities());
  }, [dispatch]);

  useEffect(() => {
    if (qualities) {
      setLocalQualities(qualities);
    }
  }, [qualities]);

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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (formData.id) {
      dispatch(UpdateQuality(formData.id, formData));
    } else {
      dispatch(AddQuality(formData));
    }
    setFormData(initialQualitySection);
  };

  const handleAddNew = () => {
    setFormData(initialQualitySection); // Reset form for new entry
  };

  const handleInlineSave = (updatedItem) => {
    dispatch(UpdateQuality(updatedItem.id, updatedItem));
  };

  const handleInlineDelete = (id) => {
    dispatch(DeleteQuality(id));
  };

  return (
    <div className="grid grid-cols-1 p-5"  >
      <h1 className="text-2xl font-bold mb-5">Admin Quality Management</h1>
      <h2 className="text-xl font-bold mb-2">
        {formData.id ? "Edit Quality Section" : "Add New Quality Section"}
      </h2>
      {/* Add or Edit Section */}
      <div className="border p-4 rounded-lg bg-white shadow-md" style={theme === lightTheme ? null : grayDarkTheme}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 rounded w-full mb-2"
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-full mb-2"
          />
        )}
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={handleAddNew}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>
      {/* List Sections */}
      <div className="space-y-4 mt-5">
        {localQualities.map((section) => (
          <InlineEdit
            key={section.id}
            item={section}
            onSave={handleInlineSave}
            onDelete={handleInlineDelete}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminQuality;
