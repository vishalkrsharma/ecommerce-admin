import Link from 'next/link';
import { BiStore } from 'react-icons/bi';

export default function Logo({ icon }) {
  return (
    <Link className='flex items-center gap-1' href='/'>
      <BiStore className={icon} />
      <span>ecommerce-admin</span>
    </Link>
  );
}
