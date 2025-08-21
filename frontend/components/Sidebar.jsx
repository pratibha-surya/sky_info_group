import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow hidden md:block">
      <div className="p-6 text-2xl font-bold text-blue-600">Panel</div>
      <nav className="mt-6">
        <ul>
          <li className="mb-2">
            <NavLink
              to="/category"
              className={({ isActive }) =>
                `block px-6 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'}`
              }
            >
              Category
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/subcategory"
              className={({ isActive }) =>
                `block px-6 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'}`
              }
            >
              Sub-category
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/product"
              className={({ isActive }) =>
                `block px-6 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'}`
              }
            >
              Product
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
