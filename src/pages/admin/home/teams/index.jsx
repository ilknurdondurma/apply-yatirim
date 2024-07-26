import React, { useState } from 'react';
import teamMembers from '../../../../dummy-data/team';

const AdminTeams = () => {
  const [teams, setTeams] = useState(teamMembers);
  const [editIndex, setEditIndex] = useState(null);
  const [editTeam, setEditTeam] = useState({ name: '', position: '', photo: null });
  const [newTeam, setNewTeam] = useState({ name: '', position: '', photo: null });

  const handleDelete = (index) => {
    const updatedTeams = teams.filter((_, i) => i !== index);
    setTeams(updatedTeams);
    // Also send a request to delete the team member from the server
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTeam({ ...teams[index], photo: null }); // Clear the photo on edit
  };

  const handleSave = () => {
    const updatedTeams = [...teams];
    updatedTeams[editIndex] = editTeam;
    setTeams(updatedTeams);
    setEditIndex(null);
    setEditTeam({ name: '', position: '', photo: null });
    // Also send a request to update the team member on the server
  };

  const handleAdd = () => {
    setTeams([newTeam, ...teams]);
    setNewTeam({ name: '', position: '', photo: null });
    // Also send a request to add the new team member to the server
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'new') {
          setNewTeam((prev) => ({ ...prev, photo: reader.result }));
        } else {
          setEditTeam((prev) => ({ ...prev, photo: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Admin Teams</h1>
      <h2 className="text-xl font-bold mb-2">Add New Team Member</h2>

      <div className="space-y-4 mb-5">
        <div className="border p-4 rounded-lg bg-white shadow-md">
          <input
            type="text"
            placeholder="Name"
            value={newTeam.name}
            onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Position"
            value={newTeam.position}
            onChange={(e) => setNewTeam({ ...newTeam, position: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="file"
            onChange={(e) => handleFileChange(e, 'new')}
            className="border p-2 rounded w-full mb-2"
          />
          {newTeam.photo && <img src={newTeam.photo} alt="Preview" className="w-24 h-24 object-cover rounded-full mb-2" />}
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Team Member
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {teams.map((team, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg bg-white shadow-md flex items-center"
          >
            <div className="w-24 h-24 flex-shrink-0">
              {team.photo ? (
                <img src={`/../../../../${team.photo}`} alt={team.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                  <span className="text-gray-500">No Photo</span>
                </div>
              )}
            </div>
            <div className="ml-4 flex-1">
              {editIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={editTeam.name}
                    onChange={(e) => setEditTeam({ ...editTeam, name: e.target.value })}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="text"
                    value={editTeam.position}
                    onChange={(e) => setEditTeam({ ...editTeam, position: e.target.value })}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'edit')}
                    className="border p-2 rounded w-full mb-2"
                  />
                  {editTeam.photo && <img src={editTeam.photo} alt="Preview" className="w-24 h-24 object-cover rounded-full mb-2" />}
                  <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                    Save
                  </button>
                  <button onClick={() => setEditIndex(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-xl font-bold">{team.name}</div>
                  <div className="text-gray-500">{team.position}</div>
                </div>
              )}
            </div>
            <div className="ml-4">
              {editIndex === index ? null : (
                <>
                  <button onClick={() => handleEdit(index)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTeams;
