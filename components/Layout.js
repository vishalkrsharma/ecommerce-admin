import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className='bg-blue-900 flex items-center min-h-screen'>
        <div className='text-center'>
          <button className='bg-white p-2 px-4 rounded-lg' onClick={() => signIn('google')}>
            Login with Google
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='bg-blue-900  flex min-h-screen'>
        <Nav />
        <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>{children}</div>
      </div>
    );
  }
}
