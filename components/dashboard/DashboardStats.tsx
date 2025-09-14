'use client';

import { Package, Users, TrendingUp, Clock } from 'lucide-react';

const stats = [
  {
    name: 'Active Products',
    value: '12',
    change: '+2 this month',
    changeType: 'positive',
    icon: Package,
  },
  {
    name: 'Connected Suppliers',
    value: '8',
    change: '+1 this week',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Revenue Growth',
    value: '23%',
    change: '+5% from last month',
    changeType: 'positive',
    icon: TrendingUp,
  },
  {
    name: 'Pending Orders',
    value: '4',
    change: '2 urgent',
    changeType: 'neutral',
    icon: Clock,
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <stat.icon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span
              className={`text-sm font-medium ${
                stat.changeType === 'positive'
                  ? 'text-green-600'
                  : stat.changeType === 'negative'
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
