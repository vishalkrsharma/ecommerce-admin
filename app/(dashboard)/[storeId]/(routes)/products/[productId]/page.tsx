import { Checkbox } from '@/components/ui/checkbox';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import prismadb from '@/lib/prismadb';
import { formatDate } from '@/lib/utils';
import { Review } from '@prisma/client';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

const ProductInfoPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      category: true,
      size: true,
      color: true,
      reviews: true,
    },
  });

  return (
    <div className='p-8'>
      <Heading
        title={product?.name}
        description='Details about the product'
      />
      <div className='my-8 grid grid-cols-3 gap-8'>
        <div className='space-y-2'>
          <h5>Name</h5>
          <Input
            className='text-white'
            value={product.name}
            disabled
          />
        </div>
        <div className='space-y-2'>
          <h5>Price</h5>
          <Input
            className='text-white'
            value={product.price}
            disabled
          />
        </div>
        <div className='space-y-2'>
          <h5>Category</h5>
          <Input
            className='text-white'
            value={product.category.name}
            disabled
          />
        </div>
        <div className='space-y-2'>
          <h5>Size</h5>
          <Input
            className='text-white'
            value={product.size.name}
            disabled
          />
        </div>
        <div className='space-y-2'>
          <h5>Color</h5>
          <Input
            className='text-white'
            value={product.color.name}
            disabled
          />
        </div>
        <div className='space-y-2'>
          <h5>Stock</h5>
          <Input
            className='text-white'
            value={product.stock}
            disabled
          />
        </div>
        <div className='border px-4 py-3 rounded-lg'>
          <div className='flex items-center space-x-3'>
            <Checkbox
              checked={product.isFeatured}
              disabled
            />
            <h5>Featured</h5>
          </div>
          <p className='text-gray-500 ml-7'>This product will appear on the home page</p>
        </div>
        <div className='border px-4 py-3 rounded-lg'>
          <div className='flex items-center space-x-3'>
            <Checkbox
              checked={product.isArchived}
              disabled
            />
            <h5>Archived</h5>
          </div>
          <p className='text-gray-500 ml-7'>This product will not appear on the store</p>
        </div>
      </div>
      <Separator />
      <div className='my-8'>
        <Heading
          title='Review'
          description='Reviews about the product'
        />
        <div className='my-8 lg:grid lg:grid-cols-3 max-lg:space-y-4 gap-4'>
          {product.reviews.map((review: Review) => (
            <div className='border px-4 py-3 rounded-lg items-center'>
              <div className='flex justify-start items-center space-x-2'>
                {review.sentiment === 'GOOD' ? <ThumbsUp className='text-gray-300' /> : <ThumbsDown className='text-gray-300' />}
                <p>{formatDate(review.createdAt)}</p>
              </div>
              <Separator className='my-2' />
              {review.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfoPage;
