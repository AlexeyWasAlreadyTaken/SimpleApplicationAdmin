import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderDTO } from '../types/order';
import { Card } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://localhost:7157/api/order')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleClick = (id: string) => () => {
    console.log('clicked');
    navigate(`/orders/${id}`);
  };

  return (
    <div className="p-4 grid gap-4">
      <button onClick={() => navigate('/orders/create')} className="bg-blue-500 text-white px-4 py-2 rounded">Создать</button>
      {orders.map(order => (
        <Card key={order.id} className="cursor-pointer" onClick={handleClick(order.id)}>
          <p className="font-semibold">{order.name}</p>
          <p>Телефон: {order.phone}</p>
        </Card>
      ))}
    </div>
  );
}


