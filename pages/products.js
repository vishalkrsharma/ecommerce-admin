import Layout from '@/components/Layout';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const res = await axios.get('/api/products');
      const { data } = res;
      setProducts(data);
    }
    getProducts();
  }, []);

  return (
    <Layout>
      <Link className='btn-primary' href='/products/new'>
        Add new Product
      </Link>
      <table className='basic mt-4'>
        <thead>
          <tr>
            <td>Product Name</td>
            <td>Operations</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className='break-all'>{product.title}</td>
              <td>
                <Link href={'/products/edit/' + product._id} className='btn-default'>
                  <BiPencil />
                  Edit
                </Link>
                <Link href={'/products/delete/' + product._id} className='btn-red'>
                  <BiTrash />
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
