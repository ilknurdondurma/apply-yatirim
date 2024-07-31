import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetComments } from '../../../../redux/actions/comment/commentActions';
import { grayDarkTheme, lightTheme } from '../../../../redux/reducers/theme/themeReducers';
export default function AdminComments() {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comment);
  const theme=useSelector((state)=>state.theme.theme)

  useEffect(() => {
    dispatch(GetComments());
  }, [dispatch]);

  const handleDeleteComment = async (id) => {
    if (window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
      try {
       // await axios.delete(`/api/comments/${id}`);
        dispatch(GetComments()); // Yeniden yorumları yüklemek için
      } catch (error) {
        console.error('Yorum silinemedi:', error);
      }
    }
  };

  if (loading) return <div className="text-center">Yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="grid p-6  mx-auto">
      <h1 className="text-2xl font-bold mb-6">Yorumlar</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Mevcut Yorumlar</h2>
        <div className="grid grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
          {comments.map((comment) => (
            <div key={comment.id} className="border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col justify-between items-center" style={theme===lightTheme ? null : grayDarkTheme}>
              <div className="w-full flex justify-between mb-2" >
                <span className="font-semibold">{comment.rating.rate}</span>
                <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
              </div>
              <p className="mb-4 line-clamp-6">{comment.description}</p>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
