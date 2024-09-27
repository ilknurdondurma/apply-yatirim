import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddCategory, DeleteCategory, GetCategories, UpdateCategory } from '../../../../redux/actions/category/categoryActions';
import { GetSectors } from '../../../../redux/actions/sector/sectorActions';
import { ToastContainer } from 'react-toastify';

export default function AdminCategories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.category);
  const { sectors } = useSelector((state) => state.sector);
  const initialCategoryState = { title: '', sectorId: '' };
  const theme = useSelector((state) => state.theme.theme);

  const [newCategory, setNewCategory] = useState(initialCategoryState);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategory, setEditedCategory] = useState(initialCategoryState);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  useEffect(() => {
    dispatch(GetCategories());
    dispatch(GetSectors());
  }, [dispatch]);

  const handleAdd = async () => {
    console.log(newCategory);
    var newCategoryJson = JSON.stringify(newCategory);
    await dispatch(AddCategory(newCategoryJson));
    dispatch(GetCategories());
    setNewCategory(initialCategoryState);
  };

  const handleEditCategory = async () => {
    if (editedCategory) {
      await dispatch(UpdateCategory(editingCategoryId, JSON.stringify(editedCategory)));
      setEditingCategoryId(null);
      dispatch(GetCategories());
      setEditedCategory(initialCategoryState);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Bu kategori ve içindeki ürünler silinecektir. Devam etmek istiyor musunuz?')) {
      try {
        await dispatch(DeleteCategory(id));
        dispatch(GetCategories());
      } catch (error) {
        console.error('Kategori silinemedi:', error);
      }
    }
  };

  const toggleExpandCategory = (id) => {
    setExpandedCategoryId(expandedCategoryId === id ? null : id);
  };

  // Kategorileri sektörlere göre gruplama fonksiyonu
  const groupCategoriesBySector = () => {
    const grouped = {};
    categories.forEach(category => {
      if (!grouped[category.sectorId]) {
        grouped[category.sectorId] = [];
      }
      grouped[category.sectorId].push(category);
    });
    return grouped;
  };

  const groupedCategories = groupCategoriesBySector();

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
    <div className="max-w-4xl p-6 grid grid-cols-1 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Kategoriler</h1>

      <div className="mb-6 flex items-center">
        <input
          style={theme}
          type="text"
          value={newCategory.title}
          onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
          placeholder="Yeni kategori adı"
          className="border border-gray-300 rounded-lg p-2 mr-4 flex-1"
        />
        <select
          value={newCategory.sectorId}
          onChange={(e) => setNewCategory({ ...newCategory, sectorId: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 mr-4 flex-1"
        >
          <option value="">Sektör Seçin</option>
          {sectors.map(sector => (
            <option key={sector.id} value={sector.id}>{sector.title}</option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Kategori Ekle
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Kategoriler Sektöre Göre</h2>
        {Object.keys(groupedCategories).map(sectorId => {
          const sector = sectors.find(s => s.id === parseInt(sectorId));
          return (
            <div key={sectorId} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{sector?.title || 'Sektör Bulunamadı'}</h3>
              {groupedCategories[sectorId].map(category => (
                <div key={category.id} className="mb-4 border-[1px] p-5 rounded-lg">
                  <div className="flex items-center">
                    {editingCategoryId === category.id ? (
                      <div className="flex sm:flex-col  md:flex-col items-center flex-1">
                        <input
                          style={theme}
                          type="text"
                          value={editedCategory.title}
                          onChange={(e) => setEditedCategory({ ...editedCategory, title: e.target.value })}
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
                      <div className='w-full flex justify-between sm:flex-col md:flex-col'>
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
                              setEditedCategory(category);
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
                            <div key={product.id} className='flex gap-5'>
                              <li>{product.title}</li>
                              <li className="opacity-50">{product.price} TL</li>
                            </div>
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
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}
