import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DeleteProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState({});

  useEffect(() => {
    if (!id) {
      return;
    }
    async function getProduct() {
      const res = await axios.get('/api/products?id=' + id[0]);
      const { data } = res;
      setProduct(data);
    }

    getProduct();
  }, []);

  const deleteProduct = async () => {
    await axios.delete('/api/products?id=' + id);
    goBack();
  };

  const goBack = () => {
    router.push('/products');
  };

  return (
    <Layout>
      <h1 className='text-center'>Do you really want to delete product "{product?.title}"?</h1>
      <div className='flex gap-10 justify-center mt-10'>
        <button className='btn-red' onClick={deleteProduct}>
          YES
        </button>
        <button className='btn-default' onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}
