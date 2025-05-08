import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDTO } from '../types/product';

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDTO | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://localhost:7157/api/product/${id}`).then(res => setProduct(res.data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct(prev => prev ? { ...prev, [e.target.name]: e.target.value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    await axios.put(`https://localhost:7157/api/product?id=${id}`, product);
    navigate('/products');
  };

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = confirm('Подтвердить удаление?');
    if (!confirmed) return;
    await axios.delete(`https://localhost:7157/api/product/${id}`);
    navigate('/products');
  };

  return product ? (
    <form onSubmit={handleSubmit} className="p-4 grid gap-4 max-w-md">
      <h2 className="text-xl font-bold">Редактирование продукта</h2>
      <input name="name" className="border p-2" value={product.name} onChange={handleChange} />
      <textarea name="description" className="border p-2" value={product.description} onChange={handleChange} />
      <textarea name="fullDescription" className="border p-2" value={product.fullDescription} onChange={handleChange} />
      <input name="pictureName" className="border p-2" value={product.pictureName} onChange={handleChange} />
      <input name="pictureNumber" type="number" className="border p-2" value={product.pictureNumber || 0} onChange={handleChange} />
      <input name="typeId" className="border p-2" value={product.typeId || ''} onChange={handleChange} />
      <input name="colorId" className="border p-2" value={product.colorId || ''} onChange={handleChange} />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Сохранить</button>
      <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Удалить</button>
    </form>
  ) : <p className="p-4">Загрузка...</p>;
}
