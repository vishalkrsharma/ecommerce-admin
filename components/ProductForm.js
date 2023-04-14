import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProducForm({ _id, title: prevTitle, description: prevDescription, price: prevPrice }) {
  const router = useRouter();
  const [goToProducts, setGoToProducts] = useState(false);

  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
  });

  console.log(_id);

  useEffect(() => {
    setProductData({
      title: prevTitle,
      description: prevDescription,
      price: prevPrice,
    });
  }, [prevTitle]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevProductData) => {
      return {
        ...prevProductData,
        [name]: value,
      };
    });
  };

  const createProduct = async (event) => {
    event.preventDefault();
    if (_id) {
      await axios.put('/api/products', { ...productData, _id });
    } else {
      await axios.post('/api/products', productData);
    }
    setGoToProducts(true);
  };

  if (goToProducts) {
    router.push('/products');
  }

  return (
    <form onSubmit={createProduct}>
      <label htmlFor='title'>Product Name</label>
      <input type='text' id='title' placeholder='Product Name' value={productData.title} name='title' onChange={handleChange} />

      <label htmlFor='description'>Description</label>
      <textarea id='description' placeholder='Description' value={productData.description} name='description' onChange={handleChange} />

      <label htmlFor='price'>Price</label>
      <input type='number' id='price' placeholder='Price' value={productData.price} name='price' onChange={handleChange} />

      <button className='btn-primary'>Save</button>
    </form>
  );
}
