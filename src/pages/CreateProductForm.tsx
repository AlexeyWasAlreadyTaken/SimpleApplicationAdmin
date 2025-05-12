import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Config from '../settings/config';

export default function CreateProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [pictureNumber, setPictureNumber] = useState(0);
  const [pictureName, setPictureName] = useState('');
  const [typeId, setTypeId] = useState('');
  const [colorId, setColorId] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${Config.API_BASE_URL}product`, {
      name,
      description,
      fullDescription,
      pictureNumber,
      pictureName,
      typeId,
      colorId
    });
    navigate('/products');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 grid gap-4 max-w-md">
      <h2 className="text-xl font-bold">Создание продукта</h2>
      <input className="border p-2" placeholder="Название" value={name} onChange={e => setName(e.target.value)} />
      <textarea className="border p-2" placeholder="Краткое описание" value={description} onChange={e => setDescription(e.target.value)} />
      <textarea className="border p-2" placeholder="Полное описание" value={fullDescription} onChange={e => setFullDescription(e.target.value)} />
      <label className="text-sm">Номер картинки</label>
      <input type="number" className="border p-2" placeholder="Номер картинки" value={pictureNumber} onChange={e => setPictureNumber(Number(e.target.value))} />
      <input className="border p-2" placeholder="Имя картинки" value={pictureName} onChange={e => setPictureName(e.target.value)} />
      <input className="border p-2" placeholder="Type ID" value={typeId} onChange={e => setTypeId(e.target.value)} />
      <input className="border p-2" placeholder="Color ID" value={colorId} onChange={e => setColorId(e.target.value)} />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Сохранить</button>
    </form>
  );
}