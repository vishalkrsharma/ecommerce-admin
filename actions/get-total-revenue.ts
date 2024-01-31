import prismadb from '@/lib/prismadb';
import { Order, OrderItem } from '@prisma/client';

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total: number, order: Order) => {
    const orderTotal = order.orderItems.reduce((orderSum: number, item: OrderItem) => {
      console.log(item);
      return orderSum + item.product.price.toNumber() * item.quantity;
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
