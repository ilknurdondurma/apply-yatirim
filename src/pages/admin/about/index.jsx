import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAbouts, updateAbout } from '../../../redux/actions/about/aboutActions';
import InlineEdit from '../../../components/inline-edit'; // adjust the import path as necessary

const AdminAbout = () => {
  const dispatch = useDispatch();
  const { abouts, loading, error } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchAbouts());
  }, [dispatch]);

  const handleSave = (about) => {
    dispatch(updateAbout(about));
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Admin Hakkımızda</h1>
      <h2 className="text-xl font-bold mb-2">Update About Page</h2>
      {abouts.map((about, index) => (
        <InlineEdit key={index} item={about} onSave={handleSave} />
      ))}
    </div>
  );
};

export default AdminAbout;
