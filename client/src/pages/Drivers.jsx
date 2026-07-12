import { IdCard } from 'lucide-react';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export default function Drivers() {
  return (
    <PlaceholderPage
      title="Drivers"
      description="Manage driver profiles, licenses, and availability."
      breadcrumbs={[{ label: 'Drivers' }]}
      icon={IdCard}
    />
  );
}
