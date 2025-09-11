'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getUserById } from '@/actions/user';
import { getCompanyByUserId } from '@/actions/company';
import { getOnboardingProgress } from '@/actions/onboarding';

interface UserData {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  createdAt: Date | null;
}

interface CompanyData {
  id: string;
  name: string;
  address: string | null;
  type: string | null;
  annualRevenue: string | null;
  website: string | null;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    const fetchData = async () => {
      try {
        const [user, company, onboarding] = await Promise.all([
          getUserById(session.user.id),
          getCompanyByUserId(session.user.id),
          getOnboardingProgress(session.user.id)
        ]);

        setUserData(user);
        setCompanyData(company);
        setOnboardingData(onboarding);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session, status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="w-full h-full border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold">
                W
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">Wonnda</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {userData?.firstName || 'User'}!
              </span>
              <button 
                onClick={() => router.push('/api/auth/signout')}
                className="text-gray-500 hover:text-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to your PrivateLabelify dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {userData?.firstName} {userData?.lastName}</p>
              <p><span className="font-medium">Email:</span> {userData?.email}</p>
              <p><span className="font-medium">Phone:</span> {userData?.phone || 'Not provided'}</p>
            </div>
          </div>

          {/* Company Info Card */}
          {companyData && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Company:</span> {companyData.name}</p>
                <p><span className="font-medium">Type:</span> {companyData.type}</p>
                <p><span className="font-medium">Revenue:</span> {companyData.annualRevenue}</p>
                <p><span className="font-medium">Website:</span> {companyData.website || 'Not provided'}</p>
              </div>
            </div>
          )}

          {/* Onboarding Progress Card */}
          {onboardingData && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Progress</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Status:</span> {onboardingData.completed ? 'Completed' : 'In Progress'}</p>
                <p><span className="font-medium">Categories:</span> {onboardingData.categories ? JSON.parse(onboardingData.categories).join(', ') : 'None'}</p>
                <p><span className="font-medium">Has Launched Before:</span> {onboardingData.hasLaunchedBefore ? 'Yes' : 'No'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg font-medium transition-colors">
              Find Suppliers
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg font-medium transition-colors">
              Source Products
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg font-medium transition-colors">
              Manage Orders
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg font-medium transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
