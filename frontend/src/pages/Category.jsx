import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const API = axios.create({
  baseURL: 'https://sky-info-group.onrender.com/api/v1',
});

const CategoryForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  
  const fetchCategories = async () => {
    try {
      const res = await API.get('/get');
      setCategories(res.data);
    } catch (err) {
      toast.error('Failed to load categories');
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Category name is required');

    try {
      setLoading(true);
      if (editingId) {
      
        await API.put(`/category/${editingId}`, { name });
        toast.success('Category updated successfully');
        setEditingId(null);
      } else {
        
        await API.post('/createcategory', { name });
        toast.success('Category added successfully!');
        navigate('/subcategories');
      }

      setName('');
      fetchCategories();
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await API.delete(`/category/${id}`);
      toast.success('Category deleted');
      fetchCategories();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  
  const handleEdit = (category) => {
    setName(category.name);
    setEditingId(category._id);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 flex items-center justify-center">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '8px',
            padding: '14px 20px',
            fontSize: '0.875rem',
            background: '#eff6ff',
            color: '#1e3a8a',
          },
          success: {
            style: {
              background: '#dcfce7',
              color: '#166534',
              border: '1px solid #10b981',
            },
          },
          error: {
            style: {
              background: '#fee2e2',
              color: '#991b1b',
              border: '1px solid #f87171',
            },
          },
        }}
      />

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-blue-200">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">
          {editingId ? 'Edit Category' : 'Create a New Category'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-md text-white font-medium transition ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update' : 'Add')}
          </button>
        </form>

        <h3 className="text-xl font-semibold text-gray-700 mb-4">Existing Categories</h3>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-h-[300px] overflow-y-auto pr-2">
          {categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition relative"
            >
              <p className="text-gray-800 font-medium">{c.name}</p>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
