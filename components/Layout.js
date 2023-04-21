import Nav from '@/components/Nav';
import { useSession, signIn } from 'next-auth/react';
import { BiMenu } from 'react-icons/bi';
import { useState } from 'react';
import Logo from './Logo';

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  const inactiveIcon = 'text-3xl';
  const activeIcon = inactiveIcon + ' text-primary';

  if (!session) {
    return (
      <div className='bg-background w-screen flex items-center justify-center min-h-screen'>
        <div className='text-center w-full'>
          <button className='bg-white p-2 px-4 rounded-lg' onClick={() => signIn('google')}>
            Login with Google
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='bg-background min-h-screen'>
        <div className='flex items-center gap-2'>
          <button className='md:hidden p-4' type='button'>
            <BiMenu className='text-3xl' onClick={() => setShowNav(!showNav)} />
          </button>
          <div className='max-md:flex grow justify-center p-4'>
            <Logo icon={activeIcon} />
          </div>
        </div>
        <div className='flex'>
          <Nav show={showNav} />
          <div className='bg-background grow max-md:m-2 rounded-lg p-4 '>{children}</div>
        </div>
      </div>
    );
  }
}
