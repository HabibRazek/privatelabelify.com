'use client';

import { ReactNode } from 'react';

interface AuthSessionProviderProps {
  children: ReactNode;
}

export default function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  // Temporarily disabled SessionProvider to avoid auth errors during development
  // Will be re-enabled once the database and auth are fully configured
  return <>{children}</>;
}
