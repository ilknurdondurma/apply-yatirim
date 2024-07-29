import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { grayDarkTheme, lightTheme } from '../../redux/reducers/theme/themeReducers';

const DataForm = ({ data, onSave, onCancel, onFileChange, initialState }) => {
    const [formData, setFormData] = useState(data || initialState);
    const theme=useSelector((state)=>state.theme.theme);
    const handleInputChange = (e) => {
    const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            onFileChange(reader.result);
            setFormData((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        onSave(formData);
        setFormData(initialState);
    };

  return (
    <div className="border p-4 rounded-lg bg-white shadow-md"  style={theme === lightTheme ? null : grayDarkTheme}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
        className="border p-2 rounded w-full mb-2"
        style={theme === lightTheme ? null : grayDarkTheme}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
        className="border p-2 rounded w-full mb-2"
        style={theme === lightTheme ? null : grayDarkTheme}

      />
      <input
        type="file"
        onChange={handleFileChange}
        className="border p-2 rounded w-full mb-2"
        style={theme === lightTheme ? null : grayDarkTheme}

      />
      {formData.image && (
        <img
          src={formData.image}
          alt="Preview"
          className="w-24 h-24 object-cover rounded-full mb-2"
          style={theme === lightTheme ? null : grayDarkTheme}

        />
      )}
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  );
};

export default DataForm;
