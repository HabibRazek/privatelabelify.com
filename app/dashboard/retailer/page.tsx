import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { users, retailers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Package,
  ShoppingCart,
  DollarSign,
  Target,
  Building2,
} from 'lucide-react';

// Real data based on user account
const getAccountStats = (retailerData: any) => [
  {
    title: 'Account Created',
    value: new Date(retailerData.createdAt || Date.now()).toLocaleDateString(),
    icon: Building2,
  },
  {
    title: 'Business Goals',
    value: retailerData.businessGoals?.length || 0,
    icon: Target,
  },
  {
    title: 'Categories',
    value: retailerData.interestedCategories?.length || 0,
    icon: Package,
  },
  {
    title: 'Profile Status',
    value: 'Complete',
    icon: DollarSign,
  },
];

export default async function RetailerDashboard() {
  // Check authentication
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/auth/signin');
  }

  // Get user and retailer data
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user.length || user[0].role !== 'retailer') {
    redirect('/auth/signin');
  }

  const retailer = await db
    .select()
    .from(retailers)
    .where(eq(retailers.userId, session.user.id))
    .limit(1);

  if (!retailer.length) {
    redirect('/auth/signin');
  }

  const userData = user[0];
  const retailerData = retailer[0];

  return (
    <DashboardLayout
      user={{
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
      }}
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome back, {userData.firstName}
          </h1>
          <p className="text-gray-500 text-sm">
            Here's an overview of {retailerData.companyName}
          </p>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {getAccountStats(retailerData).map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <stat.icon className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Content */}
        <div className="space-y-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Goals */}
            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-900">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                  Business Goals
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Your key business objectives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {retailerData.businessGoals.map((goal: string, index: number) => (
                  <div key={index} className="p-3 bg-gray-50/50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">{goal}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Interested Categories */}
            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-900">
                  <div className="p-1.5 bg-green-50 rounded-lg">
                    <Package className="h-4 w-4 text-green-600" />
                  </div>
                  Product Categories
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Categories you're interested in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {retailerData.interestedCategories.map((category: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-green-50/50 text-green-700 border-green-200 hover:bg-green-100/50 transition-colors"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Information */}
          <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-900">
                <div className="p-1.5 bg-purple-50 rounded-lg">
                  <Building2 className="h-4 w-4 text-purple-600" />
                </div>
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Company Name</p>
                  <p className="text-sm font-medium text-gray-900">{retailerData.companyName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Company Type</p>
                  <p className="text-sm font-medium text-gray-900">{retailerData.companyType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Annual Revenue</p>
                  <p className="text-sm font-medium text-gray-900">{retailerData.annualRevenue}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Product Launched</p>
                  <p className="text-sm font-medium text-gray-900">
                    {retailerData.hasLaunchedProduct ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
              {retailerData.productDescription && (
                <div className="mt-6 p-4 bg-gray-50/50 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Product Description</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{retailerData.productDescription}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Coming Soon Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-blue-50 rounded-lg w-fit mx-auto mb-4">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Orders Management</h3>
                <p className="text-sm text-gray-500 mb-4">Track and manage your orders</p>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-green-50 rounded-lg w-fit mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Supplier Network</h3>
                <p className="text-sm text-gray-500 mb-4">Connect with verified suppliers</p>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-purple-50 rounded-lg w-fit mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Analytics & Reports</h3>
                <p className="text-sm text-gray-500 mb-4">Business insights and metrics</p>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>


      </div>
    </DashboardLayout>
  );
}
