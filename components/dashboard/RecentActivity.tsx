'use client';

import { Clock, Package, Users, MessageSquare } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'product',
    title: 'New product inquiry sent',
    description: 'Collagen gummies sourcing request',
    time: '2 hours ago',
    icon: Package,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    type: 'supplier',
    title: 'Supplier responded',
    description: 'ABC Manufacturing sent a quote',
    time: '4 hours ago',
    icon: Users,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 3,
    type: 'message',
    title: 'New message received',
    description: 'Sample approval from XYZ Corp',
    time: '1 day ago',
    icon: MessageSquare,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 4,
    type: 'product',
    title: 'Product sample shipped',
    description: 'Vitamin D3 drops sample en route',
    time: '2 days ago',
    icon: Package,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 5,
    type: 'supplier',
    title: 'New supplier connection',
    description: 'Connected with Global Supplements',
    time: '3 days ago',
    icon: Users,
    color: 'bg-green-100 text-green-600',
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <Clock className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`h-8 w-8 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <a
          href="/dashboard/retailer/activity"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all activity →
        </a>
      </div>
    </div>
  );
}
