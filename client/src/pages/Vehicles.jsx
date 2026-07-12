import { Truck } from 'lucide-react';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export default function Vehicles() {
  return (
    <PlaceholderPage
      title="Vehicles"
      description="Manage your fleet's vehicles, statuses, and assignments."
      breadcrumbs={[{ label: 'Vehicles' }]}
      icon={Truck}
    />
  );
}
