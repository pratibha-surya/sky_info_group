import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const API = axios.create({
  baseURL: 'https://sky-info-group.onrender.com/api/v1',
});

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

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

    if (!name.trim() || !price || !category || !subcategory) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      if (editingId) {
       
        await API.put(`/product/${editingId}`, {
          name,
          price,
          category,
          subcategory,
        });
        toast.success('Product updated successfully');
      } else {
       
        await API.post('/createproduct', {
          name,
          price,
          category,
          subcategory,
        });
        toast.success('Product added successfully!');
      }

      
      setName('');
      setPrice('');
      setCategory('');
      setSubcategory('');
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      toast.error('Failed to submit product');
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category?._id || '');
    setSubcategory(product.subcategory?._id || '');
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      await API.delete(`/product/${id}`);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchCategories();
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
        <h2 className="text-2xl font-bold mb-5 text-center text-green-700">
          {editingId ? 'Update Product' : 'Create Product'}
        </h2>

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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Subcategory</option>
            {subcategories
              .filter((s) => !category || s.category?._id === category)
              .map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} {s.category ? `(${s.category.name})` : ''}
                </option>
              ))}
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {editingId ? 'Update' : 'Add'}
          </button>
        </form>

        
        <ul className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300">
          {products.map((p) => (
            <li
              key={p._id}
              className="px-4 py-3 bg-gray-100 rounded-md shadow-sm text-gray-700 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-500">
                  ${p.price} — {p.subcategory?.name} / {p.category?.name}
                </div>
              </div>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductForm;
