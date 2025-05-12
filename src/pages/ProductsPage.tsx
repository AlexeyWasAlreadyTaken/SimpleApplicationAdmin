import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductDTO } from '../types/product';
import { Card } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import Config from '../settings/config';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
      const url = `${Config.API_BASE_URL}product`;
      console.log("🧪 Using URL:", url); 
    axios.get(`${Config.API_BASE_URL}product`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleClick = (id: string) => () => {
    console.log('clicked');
    navigate(`/products/${id}`);
  };

  return (
    <div className="p-4 grid gap-4">
      <button onClick={() => navigate('/products/create')} className="bg-green-500 text-white px-4 py-2 rounded">Создать</button>
      {products.map(product => (
        <Card key={product.id} className="cursor-pointer" onClick={handleClick(product.id)}>
          <p className="font-semibold">{product.name}</p>
          <p>{product.description}</p>
        </Card>
      ))}
    </div>
  );
}




