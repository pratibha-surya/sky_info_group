import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

const SubcategoryForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/get');
      setCategories(res.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await API.get('/getsubcategory');
      setSubcategories(res.data);
    } catch (error) {
      toast.error('Failed to fetch subcategories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !category) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await API.post('/subcategories', { name, category });
      toast.success('Subcategory added successfully!');
      setName('');
      setCategory('');
      fetchSubcategories();
      navigate('/products');
    } catch (error) {
      toast.error('Failed to add subcategory');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-purple-100 p-6">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '10px',
            padding: '14px 20px',
            fontSize: '0.9rem',
          },
          success: {
            style: {
              background: '#ecfdf5',
              color: '#065f46',
              border: '1px solid #10b981',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #f87171',
            },
          },
        }}
      />

      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl border border-indigo-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          Create Subcategory
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Subcategory name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Add
          </button>
        </form>

        <div className="max-h-64 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-indigo-300 pr-1">
          {subcategories.map((s) => (
            <div
              key={s._id}
              className="px-4 py-2 bg-gray-100 rounded-md shadow-sm text-gray-700"
            >
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-500">
                Category: {s.category?.name || 'N/A'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryForm;
