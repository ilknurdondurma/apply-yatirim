import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetTeams, AddTeam, UpdateTeam, DeleteTeam } from '../../../../redux/actions/team/teamActions';
import { grayDarkTheme, grayLightTheme, lightTheme } from '../../../../redux/reducers/theme/themeReducers';
import { ToastContainer } from 'react-toastify';

const initialTeamState = { name: '', position: '', image: null };

const AdminTeams = () => {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state) => state.team);
  const [newTeam, setNewTeam] = useState(initialTeamState);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editableTeam, setEditableTeam] = useState(initialTeamState);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(GetTeams());
  }, [dispatch]);

  const handleAdd = async () => {
    await dispatch(AddTeam(newTeam));
    dispatch(GetTeams());
    setNewTeam(initialTeamState);
  };

  const handleEdit = (team) => {
    setEditingTeamId(team.id);
    setEditableTeam({ ...team, image: team.image });
  };

  const handleSave = async () => {
    if (editableTeam) {
      await dispatch(UpdateTeam(editingTeamId, editableTeam));
      dispatch(GetTeams());
      setEditingTeamId(null);
      setEditableTeam(initialTeamState);
    }
  };

  const handleDelete = async (id) => {
    await dispatch(DeleteTeam(id));
    dispatch(GetTeams());
  };

  const handleCancel = () => {
    setEditingTeamId(null);
    setEditableTeam(initialTeamState);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'new') {
          setNewTeam((prev) => ({ ...prev, image: reader.result }));
        } else if (type === 'edit') {
          setEditableTeam((prev) => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
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
    <div className="grid grid-cols-1 p-5">
      <h1 className="text-2xl font-bold mb-5">Admin Teams</h1>
      <h2 className="text-xl font-bold mb-2">Add New Team Member</h2>

      <div className="space-y-4 mb-5">
        <div className="border p-4 rounded-lg bg-white shadow-md" style={theme === lightTheme ? null : grayDarkTheme}>
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
            type="number"
            placeholder="Phone"
            value={newTeam.phone}
            onChange={(e) => setNewTeam({ ...newTeam, phone: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Email"
            value={newTeam.phone}
            onChange={(e) => setNewTeam({ ...newTeam, email: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Password"
            value={newTeam.phone}
            onChange={(e) => setNewTeam({ ...newTeam, password: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="file"
            onChange={(e) => handleFileChange(e, 'new')}
            className="border p-2 rounded w-full mb-2"
          />
          {newTeam.image && <img src={newTeam.image} alt="Preview" className="w-24 h-24 object-cover rounded-full mb-2" />}
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Team Member
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {teams.slice().reverse().map((team) => (
          <div
            key={team.id}
            className="w-full border p-4 rounded-lg shadow-md bg-white mb-4 flex justify-center items-center self-center mx-auto"
            style={theme === lightTheme ? grayLightTheme : grayDarkTheme}
          >
            {editingTeamId === team.id ? (
              <div className="w-full">
                <input
                  type="text"
                  value={editableTeam.name}
                  onChange={(e) => setEditableTeam({ ...editableTeam, name: e.target.value })}
                  className="border p-2 rounded w-full mb-2"
                  style={theme === lightTheme ? null : grayLightTheme}
                />
                <input
                  type="text"
                  value={editableTeam.position}
                  onChange={(e) => setEditableTeam({ ...editableTeam, position: e.target.value })}
                  className="border p-2 rounded w-full mb-2"
                  style={theme === lightTheme ? null : grayLightTheme}
                />
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'edit')}
                  className="border p-2 rounded w-full mb-2"
                />
                {editableTeam.image && <img src={editableTeam.image} alt="Preview" className="w-24 h-24 object-cover rounded-full mb-2" />}
                <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                  Save
                </button>
                <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            ) : (
              <div className="w-full">
                <div className='grid grid-cols-4'>
                  {team.imageUrl && <img src={team.imageUrl} alt="Team Member" className="w-24 h-24 object-cover rounded-full mb-2" />}
                  <div className='col-span-3'>
                      <div className="text-xl font-bold line-clamp-1">ADI SOYADI : {team.name}</div>
                      <div className=" text-lg line-clamp-1"> POSİZYONU : {team.position}</div>
                      <div className='line-clamp-2'>NUMARASI : {team.phone}</div>
                      <div className='line-clamp-2'> MAİL ADRESİ : {team.email}</div>
                  </div>
                </div>

                <button onClick={() => handleEdit(team)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(team.id)} className="bg-red-500 text-white px-4 py-2 rounded ml-4">
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

export default AdminTeams;
// ustune basınca görünmesinde kaldım !