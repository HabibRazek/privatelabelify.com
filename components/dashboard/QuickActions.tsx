'use client';

import { Plus, Search, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const actions = [
  {
    name: 'Create New Product',
    description: 'Start sourcing a new private label product',
    icon: Plus,
    href: '/dashboard/retailer/products/new',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    name: 'Find Suppliers',
    description: 'Browse and connect with verified manufacturers',
    icon: Search,
    href: '/dashboard/retailer/suppliers/browse',
    color: 'bg-green-600 hover:bg-green-700',
  },
  {
    name: 'Message Suppliers',
    description: 'Continue conversations with your suppliers',
    icon: MessageSquare,
    href: '/dashboard/retailer/messages',
    color: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    name: 'View Reports',
    description: 'Check your business analytics and insights',
    icon: FileText,
    href: '/dashboard/retailer/reports',
    color: 'bg-orange-600 hover:bg-orange-700',
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Button
            key={action.name}
            variant="outline"
            className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-shadow"
            asChild
          >
            <a href={action.href}>
              <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center mb-2`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">{action.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{action.description}</p>
              </div>
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
