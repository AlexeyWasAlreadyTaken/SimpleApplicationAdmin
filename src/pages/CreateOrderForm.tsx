import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateOrderForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [number, setNumber] = useState<number | undefined>();
  const [date, setDate] = useState('');
  const [availableProducts, setAvailableProducts] = useState<{ id: string; name: string }[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://localhost:7157/api/product')
      .then(res => setAvailableProducts(res.data.map((p: any) => ({ id: p.id, name: p.name }))))
      .catch(err => console.error(err));
  }, []);

  const handleToggleProduct = (id: string) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderProducts = selectedProductIds.map(productId => ({ productId }));

    await axios.post('https://localhost:7157/api/order', {
      name,
      phone,
      comment,
      number,
      date,
      orderProducts
    });
    navigate('/orders');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 grid gap-4 max-w-xl">
      <h2 className="text-xl font-bold">Создание заказа</h2>
      <input className="border p-2" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
      <input className="border p-2" placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} />
      <textarea className="border p-2" placeholder="Комментарий" value={comment} onChange={e => setComment(e.target.value)} />
      <input type="number" className="border p-2" placeholder="Номер заказа" value={number ?? ''} onChange={e => setNumber(Number(e.target.value))} />
      <input type="date" className="border p-2" value={date} onChange={e => setDate(e.target.value)} />

      <div className="border p-2">
        <h3 className="font-semibold mb-2">Продукты</h3>
        {availableProducts.map(product => (
          <label key={product.id} className="block">
            <input
              type="checkbox"
              checked={selectedProductIds.includes(product.id)}
              onChange={() => handleToggleProduct(product.id)}
              className="mr-2"
            />
            {product.name}
          </label>
        ))}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Сохранить заказ</button>
    </form>
  );
}
