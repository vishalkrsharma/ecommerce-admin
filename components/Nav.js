import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiHome, BiCog, BiShoppingBag, BiBox, BiCategory, BiLogOut } from 'react-icons/bi';

export default function Nav({ show }) {
  const inactiveLink = 'flex items-center gap-4 p-2 rounded-md';
  const activeLink = inactiveLink + ' bg-highlight text-black';
  const inactiveIcon = 'text-3xl';
  const activeIcon = inactiveIcon + ' text-primary';
  const router = useRouter();
  const { pathname } = router;

  const logout = async () => {
    await router.push('/');
    await signOut();
  };

  return (
    <aside
      className={
        (show ? `left-0` : `'-left-full`) +
        ` top-0 text-gray-500 p-4 fixed w-1/2 bg-background -left-full md:static md:w-auto transition-all max-md:m-2 max-md:mt-14 rounded-md`
      }
    >
      <nav className='flex flex-col gap-2'>
        <Link className={pathname === '/' ? activeLink : inactiveLink} href='/'>
          <BiHome className={pathname === '/' ? activeIcon : inactiveIcon} />
          Dashboard
        </Link>
        <Link className={pathname.includes('/products') ? activeLink : inactiveLink} href='/products'>
          <BiBox className={pathname.includes('/products') ? activeIcon : inactiveIcon} />
          Products
        </Link>
        <Link className={pathname.includes('/categories') ? activeLink : inactiveLink} href='/categories'>
          <BiCategory className={pathname === '/categories' ? activeIcon : inactiveIcon} />
          Categories
        </Link>
        <Link className={pathname.includes('/orders') ? activeLink : inactiveLink} href='/orders'>
          <BiShoppingBag className={pathname === '/orders' ? activeIcon : inactiveIcon} />
          Orders
        </Link>
        <Link className={pathname.includes('/settings') ? activeLink : inactiveLink} href='/settings'>
          <BiCog className={pathname === '/settings' ? activeIcon : inactiveIcon} />
          Settings
        </Link>
        <button className={inactiveLink} onClick={logout}>
          <BiLogOut className={inactiveIcon} />
          Log Out
        </button>
      </nav>
    </aside>
  );
}
