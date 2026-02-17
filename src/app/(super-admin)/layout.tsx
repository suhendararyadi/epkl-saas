import { auth } from '@clerk/nextjs/server';
import {
  CreditCard,
  LayoutDashboard,
  LogOut,
  School,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const SUPER_ADMIN_EMAILS = [
  'admin@epkl.id',
  'superadmin@epkl.id',
];

const sidebarItems = [
  {
    href: '/super-admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/super-admin/tenants',
    label: 'Tenants',
    icon: School,
  },
  {
    href: '/super-admin/billing',
    label: 'Billing',
    icon: CreditCard,
  },
  {
    href: '/super-admin/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check if user is authenticated
  if (!session.userId) {
    redirect('/sign-in');
  }

  // Check if user is super admin
  const userEmail = session.sessionClaims?.email as string | undefined;
  if (!userEmail || !SUPER_ADMIN_EMAILS.includes(userEmail)) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/super-admin" className="flex items-center gap-2">
              <School className="size-6 text-primary" />
              <span className="text-lg font-bold">E-PKL Super</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {sidebarItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="border-t p-4">
            <div className="mb-3 px-3">
              <p className="text-sm font-medium">{userEmail}</p>
              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>
            <Separator className="my-3" />
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LogOut className="size-4" />
                Exit to Site
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <div className="container mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export const dynamic = 'force-dynamic';
