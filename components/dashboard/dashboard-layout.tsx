'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Building2,
  Target,
  MessageSquare,
} from 'lucide-react';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: 'retailer' | 'supplier' | 'manufacturer';
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const retailerNavigation = [
  { name: 'Overview', href: '/dashboard/retailer', icon: LayoutDashboard, active: true },
  { name: 'Products', href: '#', icon: Package, active: false },
  { name: 'Suppliers', href: '#', icon: Building2, active: false },
  { name: 'Orders', href: '#', icon: ShoppingCart, active: false },
  { name: 'Analytics', href: '#', icon: BarChart3, active: false },
  { name: 'Settings', href: '#', icon: Settings, active: false },
];

const supplierNavigation = [
  { name: 'Overview', href: '/dashboard/supplier', icon: LayoutDashboard, active: true },
  { name: 'Product Catalog', href: '#', icon: Package, active: false },
  { name: 'Buyer Inquiries', href: '#', icon: MessageSquare, active: false },
  { name: 'Orders', href: '#', icon: ShoppingCart, active: false },
  { name: 'Analytics', href: '#', icon: BarChart3, active: false },
  { name: 'Settings', href: '#', icon: Settings, active: false },
];

const manufacturerNavigation = [
  { name: 'Overview', href: '/dashboard/manufacturer', icon: LayoutDashboard, active: true },
  { name: 'Product Showcase', href: '#', icon: Package, active: false },
  { name: 'Buyer Requests', href: '#', icon: MessageSquare, active: false },
  { name: 'Production Orders', href: '#', icon: ShoppingCart, active: false },
  { name: 'Analytics', href: '#', icon: BarChart3, active: false },
  { name: 'Settings', href: '#', icon: Settings, active: false },
];

export function DashboardLayout({ children, userRole = 'retailer', user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Select navigation based on user role
  const navigation = userRole === 'supplier' ? supplierNavigation :
                    userRole === 'manufacturer' ? manufacturerNavigation :
                    retailerNavigation;

  const handleLogout = async () => {
    try {
      console.log('Logout initiated...');
      // Sign out using NextAuth
      const { signOut } = await import('next-auth/react');
      await signOut({
        callbackUrl: '/',
        redirect: true
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: redirect manually
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gray-25"
      style={{ backgroundColor: '#fafafa' }}>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-56 flex-col bg-white border-r border-gray-100">
          <div className="flex h-16 items-center justify-between px-6">
            <Link href={userRole === 'supplier' ? '/dashboard/supplier' : userRole === 'manufacturer' ? '/dashboard/manufacturer' : '/dashboard/retailer'} className="flex items-center">
              <Image
                src="/logo/Make your private label.png"
                alt="PrivateLabelify"
                width={140}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-4 py-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return item.active ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-4 w-4 ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  {item.name}
                </Link>
              ) : (
                <div
                  key={item.name}
                  className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-400 cursor-not-allowed"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-300" />
                  <span>{item.name}</span>
                  <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                    Soon
                  </span>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-56 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-100">
          <div className="flex h-16 items-center px-6">
            <Link href={userRole === 'supplier' ? '/dashboard/supplier' : userRole === 'manufacturer' ? '/dashboard/manufacturer' : '/dashboard/retailer'} className="flex items-center">
              <Image
                src="/logo/Make your private label.png"
                alt="PrivateLabelify"
                width={140}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <nav className="flex-1 space-y-1 px-4 py-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return item.active ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-4 w-4 ${
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    />
                    {item.name}
                  </Link>
                ) : (
                  <div
                    key={item.name}
                    className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-400 cursor-not-allowed"
                  >
                    <item.icon className="mr-3 h-4 w-4 text-gray-300" />
                    <span>{item.name}</span>
                    <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                      Soon
                    </span>
                  </div>
                );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-56">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm px-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1">
              {/* Search can be added here */}
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4 text-gray-500" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full"></span>
              </Button>

              <Separator orientation="vertical" className="h-4 bg-gray-200" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/retailer/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="px-6 sm:px-8 lg:px-12 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
