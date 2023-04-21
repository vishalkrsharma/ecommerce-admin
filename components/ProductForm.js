import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiUpload, BiTrash } from 'react-icons/bi';

export default function ProductForm(props) {
  const { _id, title: prevTitle, description: prevDescription, price: prevPrice, image: prevImage, category: prevCategory, properties: prevProperties } = props;
  const router = useRouter();
  const [goToProducts, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState([]);

  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
    properties: {},
  });

  if (router.asPath.includes('/products/edit')) {
    useEffect(() => {
      setProductData({
        title: prevTitle,
        description: prevDescription,
        price: prevPrice,
        image: prevImage,
        category: prevCategory,
        properties: prevProperties,
      });
    }, [prevTitle, prevDescription, prevPrice, prevImage, prevDescription]);
  }

  useEffect(() => {
    async function getCategories() {
      const res = await axios.get('/api/categories');
      const { data } = res;
      setCategories(data);
    }
    getCategories();
  }, []);

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
    console.log(productData);
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

  const setProductProp = (propName, value) => {
    setProductData((prevProductData) => {
      const properties = { ...productData.properties };
      properties[propName] = value;
      return {
        ...prevProductData,
        properties,
      };
    });
  };

  if (goToProducts) {
    router.push('/products');
  }

  const propertiesToFill = [];
  if (categories.length > 0 && productData.category) {
    let catInfo = categories.find(({ _id }) => _id === productData.category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <form onSubmit={createProduct}>
      <label htmlFor='title'>Product Name</label>
      <input type='text' id='title' placeholder='Product Name' value={productData.title} name='title' onChange={handleChange} />

      <label htmlFor='category'>Category</label>
      <select value={productData.category} name='category' onChange={handleChange}>
        <option value=''>Uncategorized</option>
        {categories.length > 0 && categories.map((cat) => <option value={cat._id}>{cat.name}</option>)}
      </select>
      <label htmlFor='properties'>Properties</label>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div className='flex flex-col'>
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <div>
              <select id='properties' value={productData.properties[p.name]} onChange={(ev) => setProductProp(p.name, ev.target.value)}>
                <option value=''>No Value</option>
                {p.values.map((v) => (
                  <option value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

      <label htmlFor='image'>Images</label>
      <div className='flex gap-2 items-center mb-2'>
        <div className=' w-32 h-32 border flex justify-center items-center flex-col bg-gray-200 rounded-lg relative shadow-md'>
          <BiUpload className={`text-4xl ${productData.image === '' ? 'text-primary' : 'text-gray-500'}`} />
          <div className={`${productData.image === '' ? 'text-primary' : 'text-gray-500'}`}>Upload</div>
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
