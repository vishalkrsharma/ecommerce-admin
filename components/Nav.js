import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiStore, BiHome, BiCog, BiShoppingBag, BiBox, BiCategory } from 'react-icons/bi';

export default function Nav() {
  const inactiveLink = 'flex items-center gap-4 p-2 rounded-l-lg';
  const activeLink = inactiveLink + ' bg-white text-blue-900';
  const router = useRouter();
  const { pathname } = router;

  return (
    <aside className='text-white p-4 pr-0'>
      <Link className='flex items-center gap-1 mb-4 mr-4' href='/'>
        <BiStore className='text-3xl' />
        &nbsp;
        <span>ecommerce-admin</span>
      </Link>
      <nav className='flex flex-col gap-2'>
        <Link className={pathname === '/' ? activeLink : inactiveLink} href='/'>
          <BiHome className='text-3xl' />
          Dashboard
        </Link>
        <Link className={pathname.includes('/categories') ? activeLink : inactiveLink} href='/categories'>
          <BiCategory className='text-3xl' />
          Categories
        </Link>
        <Link className={pathname.includes('/products') ? activeLink : inactiveLink} href='/products'>
          <BiBox className='text-3xl' />
          Products
        </Link>
        <Link className={pathname.includes('/orders') ? activeLink : inactiveLink} href='/orders'>
          <BiShoppingBag className='text-3xl' />
          Orders
        </Link>
        <Link className={pathname.includes('/settings') ? activeLink : inactiveLink} href='/settings'>
          <BiCog className='text-3xl' />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
