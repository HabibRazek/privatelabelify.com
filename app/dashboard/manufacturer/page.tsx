import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { users, suppliers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import DashboardLayout from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, DollarSign, Globe, Package, Target, Factory } from 'lucide-react';

export default async function ManufacturerDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  // Get user data
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (!user.length || user[0].role !== 'supplier') {
    redirect('/auth/signin');
  }

  // Get manufacturer profile (stored in suppliers table)
  const manufacturerProfile = await db
    .select()
    .from(suppliers)
    .where(eq(suppliers.userId, user[0].id))
    .limit(1);

  if (!manufacturerProfile.length) {
    redirect('/auth/signup/supplier');
  }

  const manufacturer = manufacturerProfile[0];

  return (
    <DashboardLayout userRole="manufacturer">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {manufacturer.firstName}!
          </h1>
          <p className="text-gray-600">
            Manage your manufacturing business and connect with potential buyers.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Company Type</CardTitle>
              <Factory className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{manufacturer.companyType}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Size</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{manufacturer.teamSize}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {manufacturer.annualRevenue.replace('-', ' - $').replace('k', 'K').replace('m', 'M')}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Manufacturing Countries</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{manufacturer.manufacturingCountries.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Manufacturing Company
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Company Name</label>
                <p className="text-gray-900">{manufacturer.companyName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Website</label>
                <p className="text-gray-900">{manufacturer.website}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-gray-900">{manufacturer.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Your Role</label>
                <p className="text-gray-900">{manufacturer.userRole}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Manufacturing Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">What You Manufacture</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {manufacturer.offerings.map((offering) => (
                    <Badge key={offering} variant="secondary" className="text-xs">
                      {offering}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Production Types</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {manufacturer.productionTypes.map((type) => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Production Method</label>
                <p className="text-gray-900">{manufacturer.productionOutsourcing}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Manufacturing Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Manufacturing Locations
            </CardTitle>
            <CardDescription>
              Countries where you have manufacturing facilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {manufacturer.manufacturingCountries.map((country) => (
                <Badge key={country} variant="default" className="text-sm">
                  {country}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* MOQ Information */}
        {manufacturer.moqQuantities.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Minimum Order Quantities (MOQ)
              </CardTitle>
              <CardDescription>
                Your minimum order requirements for different product types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {manufacturer.moqQuantities.map((moq, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium text-gray-900">{moq.type}</div>
                    <div className="text-sm text-gray-600">Min: {moq.quantity}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Support Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Business Goals
            </CardTitle>
            <CardDescription>
              How we can help support your manufacturing business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {manufacturer.supportGoals.map((goal) => (
                <Badge key={goal} variant="outline" className="text-sm">
                  {goal}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Company Description */}
        <Card>
          <CardHeader>
            <CardTitle>Company Introduction</CardTitle>
            <CardDescription>
              Your company description for potential buyers and partners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 leading-relaxed">{manufacturer.companyDescription}</p>
          </CardContent>
        </Card>

        {/* Coming Soon Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Buyer Requests
                <Badge variant="secondary">Soon</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Receive and manage requests from potential buyers.
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Product Showcase
                <Badge variant="secondary">Soon</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Display your manufacturing capabilities and sample products.
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Production Analytics
                <Badge variant="secondary">Soon</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Track inquiries, orders, and manufacturing performance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
