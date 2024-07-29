import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetContacts } from '../../../../redux/actions/contact/contactActions';
import { GetTeams } from '../../../../redux/actions/team/teamActions';
import InlineEdit from '../../../../components/inline-edit'; // Adjust the path as necessary
import { grayDarkTheme, lightTheme } from '../../../../redux/reducers/theme/themeReducers';

const initialTeamState = { title: '', description: '', image: null };

const AdminTeams = () => {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state) => state.team);
  const [localTeams, setLocalTeams] = useState([]);
  const [newTeam, setNewTeam] = useState(initialTeamState);
  const theme=useSelector((state)=>state.theme.theme);


  useEffect(() => {
    dispatch(GetContacts());
    dispatch(GetTeams());
  }, [dispatch]);

  useEffect(() => {
    if (teams) {
      setLocalTeams(teams);
    }
  }, [teams]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;

  const handleDelete = (id) => {
    const updatedTeams = localTeams.filter((team) => team.id !== id);
    setLocalTeams(updatedTeams);
    // Send a request to delete the team from the server
  };

  const handleSave = (updatedTeam) => {
    const updatedTeams = localTeams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team));
    setLocalTeams(updatedTeams);
    // Send a request to update the team on the server
  };

  const handleAdd = () => {
    const newTeamWithId = { ...newTeam, id: Date.now() }; // Add a temporary ID
    setLocalTeams([newTeamWithId, ...localTeams]);
    setNewTeam(initialTeamState);
    // Send a request to add the team to the server
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'new') {
          setNewTeam((prev) => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 p-5">
      <h1 className="text-2xl font-bold mb-5">Admin Teams</h1>
      <h2 className="text-xl font-bold mb-2">Add New Team Member</h2>

      <div className="space-y-4 mb-5" >
        <div className="border p-4 rounded-lg bg-white shadow-md" style={theme === lightTheme ? null : grayDarkTheme}>
          <input
            type="text"
            placeholder="Name"
            value={newTeam.title}
            onChange={(e) => setNewTeam({ ...newTeam, title: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTeam.description}
            onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
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
        {localTeams.map((team) => (
          <InlineEdit
            key={team.id}
            item={team}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminTeams;
