import Layout from '@/components/Layout';
import Nav from '@/components/Nav';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className='text-blue-900 flex justify-between items-center'>
        Hello, {session?.user?.name}
        <div className='flex items-center gap-4 bg-gray-300 p-2 rounded-lg cursor-pointer' title='Logout' onClick={() => signOut()}>
          <Image src={session?.user?.image} alt={session?.user?.name} width={40} height={40} className='rounded-full' />
          <div>{session?.user?.name}</div>
        </div>
      </div>
    </Layout>
  );
}
