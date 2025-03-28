// hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/services/auth-context';

export function useAuthRedirect(redirectIfAuthenticated = false) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (redirectIfAuthenticated && user) {
      router.push('/');
    } else if (!redirectIfAuthenticated && !user) {
      router.push('/usuario');
    }
  }, [user, redirectIfAuthenticated, router]);
}