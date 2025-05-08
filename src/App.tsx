import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import CreateOrderForm from './pages/CreateOrderForm';
import CreateProductForm from './pages/CreateProductForm';
import ViewOrder from './pages/ViewOrder';
import ViewProduct from './pages/ViewProduct';

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/orders" />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/create" element={<CreateOrderForm />} />
          <Route path="/orders/:id" element={<ViewOrder />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/create" element={<CreateProductForm />} />
          <Route path="/products/:id" element={<ViewProduct />} />
        </Routes>
      </div>
    </div>
  );
}

