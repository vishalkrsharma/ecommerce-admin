import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState({});

  useEffect(() => {
    if (!id) return;
    async function getProduct() {
      const res = await axios.get('/api/products?id=' + id[0]);
      setProduct(res.data);
    }

    getProduct();
  }, []);

  return (
    <Layout>
      <h1>Edit Product</h1>
      <ProductForm {...product} />
    </Layout>
  );
}
