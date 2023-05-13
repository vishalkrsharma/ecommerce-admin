import Layout from '@/components/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function getOrders() {
      const res = await axios.get('/api/orders');
      const { data } = res;
      setOrders(data);
    }
    getOrders();
  }, []);

  console.log(orders);
  return (
    <Layout>
      <h1>Orders</h1>
      <table className='basic'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? 'text-green-600' : 'text-red-600'}>{order.paid ? 'YES' : 'NO'}</td>
                <td>
                  {order.name} {order.email} <br />
                  {order.city} {order.postalCode} <br />
                  {order.country} <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data.product_data?.name} x {l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
