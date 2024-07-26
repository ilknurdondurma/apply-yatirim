import React, { useState } from 'react';

const InlineEdit = ({ item, onSave, onDelete }) => {
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

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white mb-4 flex justify-between items-center">
      {isEditing ? (
        <div className="w-full">
          <input
            type="text"
            value={editableItem.title}
            onChange={(e) => setEditableItem({ ...editableItem, title: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <textarea
            value={editableItem.description}
            onChange={(e) => setEditableItem({ ...editableItem, description: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          {editableItem.videoUrl !== undefined && (
            <input
              type="text"
              value={editableItem.videoUrl}
              onChange={(e) => setEditableItem({ ...editableItem, videoUrl: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
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
          <div className="text-xl font-bold">{item.title}</div>
          <div>{item.description}</div>
          {item.videoUrl && <div>{item.videoUrl}</div>}
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
