import { createFileRoute } from '@tanstack/react-router';
import { UserPreferencesForm } from '@/features/user-preferences';

export const Route = createFileRoute('/user-preferences')({
  component: UserPreferencesPage,
});

function UserPreferencesPage() {
  return <UserPreferencesForm />;
}
