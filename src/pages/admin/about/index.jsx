import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAbouts, UpdateAbout } from '../../../redux/actions/about/aboutActions';
import InlineEdit from '../../../components/inline-edit'; // adjust the import path as necessary

const AdminAbout = () => {
  const dispatch = useDispatch();
  const { abouts, loading, error } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(GetAbouts());
  }, [dispatch]);

  const handleSave = (about) => {
    dispatch(UpdateAbout(about));
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="mx-auto">Hata: {error}</div>;

  return (
    <div className='grid grid-cols-1'>
      <h1 className="text-2xl font-bold mb-5">Admin Hakkımızda</h1>
      <h2 className="text-xl font-bold mb-2">Update About Page</h2>
      <div className='grid grid-cols-2 sm:grid-cols-1 h-full gap-5' >
        {abouts.map((about, index) => (
          <InlineEdit key={index} item={about} onSave={handleSave} />
        ))}
      </div>
    </div>
  );
};

export default AdminAbout;
