'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

const MainNav = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          className={cn('text-sm font-medium transition-colors hover:text-primary', route.active ? 'text-black dark:text-white' : 'text-muted-foreground')}
          key={route.href}
          href={route.href}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
