import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

const SetupLayout = async ({ children }: PropsWithChildren) => {
  const { userId } = auth();

  if (!userId) redirect('/sigin-in');

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
};

export default SetupLayout;
