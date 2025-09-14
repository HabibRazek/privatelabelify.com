'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ManufacturerStepper from "@/components/ManufacturerStepper";

export default function SupplierSignupPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if already logged in
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard/manufacturer');
    }
  }, [status, session, router]);

  return <ManufacturerStepper />;
}
