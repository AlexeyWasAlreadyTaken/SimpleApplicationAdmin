import { NavLink } from 'react-router-dom';

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 space-y-2 h-screen">
      <h1 className="text-lg font-bold mb-4">Simple Application Admin</h1>
      <NavLink to="/orders" className={({ isActive }) => `block p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-300 font-semibold' : ''}`}>
        Orders
      </NavLink>
      <NavLink to="/products" className={({ isActive }) => `block p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-300 font-semibold' : ''}`}>
        Products
      </NavLink>
    </aside>
  );
}



