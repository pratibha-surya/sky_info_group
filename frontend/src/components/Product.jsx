import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const fetchSubcategories = async () => {
    try {
      const res = await API.get('/getsubcategory');
      setSubcategories(res.data);
    } catch (error) {
      toast.error('Failed to fetch subcategories');
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get('/getproduct');
      setProducts(res.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !subcategory) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await API.post('/createproduct', { name, price, subcategory });
      toast.success('Product added successfully!');

      setName('');
      setPrice('');
      setSubcategory('');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  useEffect(() => {
    fetchSubcategories();
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-50 to-emerald-100 p-6">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#f0fdf4',
            color: '#065f46',
            padding: '14px',
          },
          success: {
            style: {
              background: '#d1fae5',
              color: '#064e3b',
            },
          },
          error: {
            style: {
              background: '#fee2e2',
              color: '#991b1b',
            },
          },
        }}
      />

      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl border border-green-200">
        <h2 className="text-2xl font-bold mb-5 text-center text-green-700">Create Product</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} {s.category ? `(${s.category.name})` : ''}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Add
          </button>
        </form>

        <ul className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300">
          {products.map((p) => (
            <li
              key={p._id}
              className="px-4 py-2 bg-gray-100 rounded-md shadow-sm text-gray-700"
            >
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-500">
                ${p.price} — {p.subcategory?.name} / {p.subcategory?.category?.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductForm;
