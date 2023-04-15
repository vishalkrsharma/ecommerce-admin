import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiUpload } from 'react-icons/bi';

export default function ProducForm(props) {
  const { _id, title: prevTitle, description: prevDescription, price: prevPrice, images } = props;
  const router = useRouter();
  const [goToProducts, setGoToProducts] = useState(false);

  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
  });

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

  const uploadImages = async (event) => {
    const files = event.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      // for (const file in files) {
      //   data.append('file', file);
      // }

      data.append('file', files[0]);
      const res = await axios.post('/api/upload', data);
      console.log(res);
    }
  };

  return (
    <form onSubmit={createProduct}>
      <label htmlFor='title'>Product Name</label>
      <input type='text' id='title' placeholder='Product Name' value={productData.title} name='title' onChange={handleChange} />

      <label htmlFor='image'>Images</label>
      <div className='mb-2 w-32 h-32 border flex justify-center items-center flex-col bg-gray-200 rounded-lg relative'>
        <BiUpload className='text-4xl text-blue-900' />
        <div>Upload</div>
        <input className='w-full h-full absolute mt-3 z-10 opacity-0 cursor-pointer' type='file' id='image' onChange={uploadImages} />
      </div>
      {!images?.length && <div>No Photos</div>}

      <label htmlFor='description'>Description</label>
      <textarea id='description' placeholder='Description' value={productData.description} name='description' onChange={handleChange} />

      <label htmlFor='price'>Price</label>
      <input type='number' id='price' placeholder='Price' value={productData.price} name='price' onChange={handleChange} />

      <button className='btn-primary'>Save</button>
    </form>
  );
}
