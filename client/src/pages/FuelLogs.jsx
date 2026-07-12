import { Fuel } from 'lucide-react';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export default function FuelLogs() {
  return (
    <PlaceholderPage
      title="Fuel Logs"
      description="Record and review fuel purchases across the fleet."
      breadcrumbs={[{ label: 'Fuel Logs' }]}
      icon={Fuel}
    />
  );
}
