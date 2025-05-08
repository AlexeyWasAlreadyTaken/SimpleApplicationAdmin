import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { OrderDTO } from '../types/order';

export default function ViewOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDTO | null>(null);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      axios.get(`https://localhost:7157/api/order/${id}`).then(res => {
        setOrder(res.data);
        setSelectedProductIds(res.data.orderProducts.map((op: any) => op.productId));
      });
      axios.get('https://localhost:7157/api/product').then(res => {
        const simplified = res.data.map((p: any) => ({ id: p.id, name: p.name }));
        setProducts(simplified);
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrder(prev => prev ? { ...prev, [e.target.name]: e.target.value } : null);
  };

  const toggleProduct = (productId: string) => {
    setSelectedProductIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    await axios.put(`https://localhost:7157/api/order?id=${id}`, {
      ...order,
      orderProducts: selectedProductIds.map(pid => ({ productId: pid }))
    });
    navigate('/orders');
  };

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = confirm('Подтвердить удаление?');
    if (!confirmed) return;
    await axios.delete(`https://localhost:7157/api/order/${id}`);
    navigate('/orders');
  };

  return order ? (
    <form onSubmit={handleSubmit} className="p-4 grid gap-4 max-w-md">
      <h2 className="text-xl font-bold">Редактирование заказа</h2>
      <input name="name" className="border p-2" value={order.name || ''} onChange={handleChange} />
      <input name="phone" className="border p-2" value={order.phone || ''} onChange={handleChange} />
      <textarea name="comment" className="border p-2" value={order.comment || ''} onChange={handleChange} />
      <input name="number" type="number" className="border p-2" value={order.number || 0} onChange={handleChange} />
      <input name="date" type="date" className="border p-2" value={order.date ? order.date.substring(0, 10) : ''} onChange={handleChange} />

      <div className="border p-2">
        <h3 className="font-semibold mb-2">Продукты в заказе</h3>
        {products.map(product => (
          <label key={product.id} className="block">
            <input
              type="checkbox"
              checked={selectedProductIds.includes(product.id)}
              onChange={() => toggleProduct(product.id)}
              className="mr-2"
            />
            {product.name}
          </label>
        ))}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Сохранить</button>
      <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Удалить</button>
    </form>
  ) : <p className="p-4">Загрузка...</p>;
}
