import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
    
      {isOpen && (
        <div
          className="fixed inset-0  z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow transform z-50 transition-transform duration-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold text-blue-600 flex justify-between items-center md:block">
          <span>Panel</span>
        
          <button onClick={toggleSidebar} className="text-gray-500 md:hidden text-xl">✕</button>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="mb-2">
              <NavLink
                to="/category"
                className={({ isActive }) =>
                  `block px-6 py-2 rounded ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`
                }
                onClick={toggleSidebar}
              >
                Category
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/subcategory"
                className={({ isActive }) =>
                  `block px-6 py-2 rounded ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`
                }
                onClick={toggleSidebar}
              >
                Sub-category
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  `block px-6 py-2 rounded ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`
                }
                onClick={toggleSidebar}
              >
                Product
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
