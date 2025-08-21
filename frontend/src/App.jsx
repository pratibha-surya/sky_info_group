import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategoryForm from './components/Category';
import SubcategoryForm from './components/SubCategory';
import ProductForm from './components/Product';
       

function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-100 min-h-screen">
       

        <Routes>
          <Route path="/" element={<CategoryForm />} />
          <Route path="/subcategories" element={<SubcategoryForm />} />
          <Route path="/products" element={<ProductForm />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
