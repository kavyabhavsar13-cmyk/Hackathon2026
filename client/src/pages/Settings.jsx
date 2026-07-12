import { Settings as SettingsIcon } from 'lucide-react';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export default function Settings() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Manage your account, preferences, and organization settings."
      breadcrumbs={[{ label: 'Settings' }]}
      icon={SettingsIcon}
    />
  );
}
