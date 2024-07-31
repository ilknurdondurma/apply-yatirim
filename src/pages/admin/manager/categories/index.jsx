import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { GetCategories } from '../../../../redux/actions/category/categoryActions';
// import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../../../../redux/actions/category/categoryActions';

export default function AdminCategories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.category);

  const [newCategory, setNewCategory] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);

  const handleAddCategory = async () => {
    try {
      const response = await axios.post('/api/categories', { name: newCategory });
      //dispatch(addCategory(response.data));
      setNewCategory('');
    } catch (error) {
      console.error('Kategori eklenemedi:', error);
    }
  };

  const handleEditCategory = async (id) => {
    try {
      const response = await axios.put(`/api/categories/${id}`, { name: editedCategoryName });
     // dispatch(updateCategory(response.data));
      setEditingCategoryId(null);
      setEditedCategoryName('');
    } catch (error) {
      console.error('Kategori düzenlenemedi:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Bu kategori ve içindeki ürünler silinecektir. Devam etmek istiyor musunuz?')) {
      try {
        await axios.delete(`/api/categories/${id}`);
        //dispatch(deleteCategory(id));
      } catch (error) {
        console.error('Kategori silinemedi:', error);
      }
    }
  };

  const toggleExpandCategory = (id) => {
    setExpandedCategoryId(expandedCategoryId === id ? null : id);
  };

  if (loading) return <div className="text-center">Yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500">Hata: {error}</div>;

  return (
    <div className="max-w-4xl p-6 grid grid-cols-1 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Kategoriler</h1>

      <div className="mb-6 flex items-center">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Yeni kategori adı"
          className="border border-gray-300 rounded-lg p-2 mr-4 flex-1"
        />
        <button
          onClick={handleAddCategory}
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/60"
        >
          Kategori Ekle
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Mevcut Kategoriler</h2>
        {categories.map(category => (
          <div key={category.id} className="mb-4 border-[1px] p-5 rounded-lg">
            <div className="flex items-center">
              {editingCategoryId === category.id ? (
                <div className="flex sm:flex-col  md:flex-col items-center flex-1">
                  <input
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 mr-4 flex-1"
                  />
                  <button
                    onClick={() => handleEditCategory(category.id)}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mr-2"
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => setEditingCategoryId(null)}
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                  >
                    İptal
                  </button>
                </div>
              ) : (
                <div className='w-full flex justify-between sm:flex-col md:flex-col '>
                  <span className="flex-1">{category.title}</span>
                  <div>
                    <button
                        onClick={() => toggleExpandCategory(category.id)}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 mr-2"
                    >
                        {expandedCategoryId === category.id ? 'Kapat' : 'Genişlet'}
                    </button>
                    <button
                        onClick={() => {
                        setEditingCategoryId(category.id);
                        setEditedCategoryName(category.title);
                        }}
                        className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 mr-2"
                    >
                        Düzenle
                    </button>
                    <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                        Sil
                    </button>
                  </div>
                </div>
              )}
            </div>
            {expandedCategoryId === category.id && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Ürünler:</h3>
                {category.products && category.products.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {category.products.map(product => (
                      <li key={product.id}>{product.title}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Bu kategoride ürün bulunmamaktadır.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
