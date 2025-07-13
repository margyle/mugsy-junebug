import { createFileRoute, redirect } from '@tanstack/react-router';
import { UserPreferencesForm } from '@/features/user-preferences';
import { authClient } from '@/lib/auth-client';

export const Route = createFileRoute('/user-preferences/')({
  component: UserPreferencesPage,
  beforeLoad: async () => {
    const session = await authClient.getSession();

    if (!session?.data?.user) {
      throw redirect({
        to: '/login',
      });
    }
  },
});

function UserPreferencesPage() {
  return <UserPreferencesForm />;
}
