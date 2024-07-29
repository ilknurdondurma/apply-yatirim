import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { grayDarkTheme, grayLightTheme, lightTheme } from '../../redux/reducers/theme/themeReducers';

const InlineEdit = ({ item, onSave, onDelete }) => {
  const theme = useSelector((state) => state.theme.theme);
  const [isEditing, setIsEditing] = useState(false);
  const [editableItem, setEditableItem] = useState({ ...item });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editableItem);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableItem({ ...item });
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableItem((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="w-full border p-4 rounded-lg shadow-md bg-white mb-4 flex justify-center items-center self-center mx-auto"
      style={theme === lightTheme ? grayLightTheme : grayDarkTheme}
    >
      {isEditing ? (
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
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 rounded w-full mb-2"
            style={theme === lightTheme ? null : grayLightTheme}
          />
          {editableItem.image && (
            <img src={editableItem.image} alt="Preview" className="w-24 h-24 object-cover rounded-full mb-2" />
          )}
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Save
          </button>
          <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      ) : (
        <div className="w-full">
          <div className="text-xl font-bold line-clamp-1">{item.title}</div>
          <div className='line-clamp-2'>{item.description}</div>
          {item.image && (
            <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-full mb-2" />
          )}
          <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
            Edit
          </button>
          {onDelete && (
            <button onClick={() => onDelete(item.id)} className="bg-red-500 text-white px-4 py-2 rounded ml-4">
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InlineEdit;
