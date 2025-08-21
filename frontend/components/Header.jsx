const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <button
        className="text-2xl text-gray-600 md:hidden"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Dashboard</h1>
    </header>
  );
};

export default Header;
