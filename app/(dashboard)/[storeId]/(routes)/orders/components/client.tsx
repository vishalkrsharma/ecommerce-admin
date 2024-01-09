import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns, OrderColumn } from './column';

const OrderClient = ({ data }: { data: OrderColumn[] }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage orders for your store'
      />
      <Separator />
      <DataTable
        searchKey='products'
        columns={columns}
        data={data}
      />
    </>
  );
};

export default OrderClient;
