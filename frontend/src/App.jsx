import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CategoryForm from './pages/Category';
import SubcategoryForm from './pages/SubCategory';
import ProductForm from './pages/Product';
import Layout from '../components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/category" element={<CategoryForm />} />
          <Route path="/subcategory" element={<SubcategoryForm />} />
          <Route path="/product" element={<ProductForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
