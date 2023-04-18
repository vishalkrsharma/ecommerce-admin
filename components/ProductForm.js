import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiUpload, BiTrash } from 'react-icons/bi';

export default function ProducForm(props) {
  const { _id, title: prevTitle, description: prevDescription, price: prevPrice, image: prevImage } = props;
  const router = useRouter();
  const [goToProducts, setGoToProducts] = useState(false);

  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
  });

  if (router.asPath.includes('/products/edit')) {
    useEffect(() => {
      setProductData({
        title: prevTitle,
        description: prevDescription,
        price: prevPrice,
        image: prevImage,
      });
    }, [prevTitle, prevDescription, prevPrice, prevImage]);
  }

  const imgToBase64 = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    const imgs = [];
    reader.onload = () => {
      setProductData((prevProductData) => ({
        ...prevProductData,
        image: reader.result,
      }));
    };
  };

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

  const deleteImage = () => {
    setProductData((prevProductData) => ({
      ...prevProductData,
      image: '',
    }));
  };

  if (goToProducts) {
    router.push('/products');
  }

  return (
    <form onSubmit={createProduct}>
      <label htmlFor='title'>Product Name</label>
      <input type='text' id='title' placeholder='Product Name' value={productData.title} name='title' onChange={handleChange} />

      <label htmlFor='image'>Images</label>
      <div className='flex gap-2 items-center mb-2'>
        <div className=' w-32 h-32 border flex justify-center items-center flex-col bg-gray-200 rounded-lg relative'>
          <BiUpload className={`text-4xl ${productData.image === '' ? 'text-blue-900' : 'text-gray-500'}`} />
          <div className={`${productData.image === '' ? 'text-blue-900' : 'text-gray-500'}`}>Upload</div>
          <input
            className='w-full h-full absolute mt-3 z-10 opacity-0 cursor-pointer'
            type='file'
            id='image'
            onChange={imgToBase64}
            disabled={productData.image !== ''}
          />
        </div>
        {productData.image === '' ? (
          <div className='w-32 h-32 flex items-center justify-center'>No Images</div>
        ) : (
          <div className='relative' onClick={deleteImage}>
            <Image className='rounded-lg' src={productData.image} width={128} height={128} alt='product image' />
            <div className='absolute w-32 h-32 text-4xl -top-1 z-10 flex items-center justify-center text-white'>
              <BiTrash />
            </div>
          </div>
        )}
      </div>

      <label htmlFor='description'>Description</label>
      <textarea id='description' placeholder='Description' value={productData.description} name='description' onChange={handleChange} />

      <label htmlFor='price'>Price</label>
      <input type='number' id='price' placeholder='Price' value={productData.price} name='price' onChange={handleChange} />

      <button className='btn-primary'>Save</button>
    </form>
  );
}
