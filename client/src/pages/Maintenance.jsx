import { Wrench } from 'lucide-react';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export default function Maintenance() {
  return (
    <PlaceholderPage
      title="Maintenance"
      description="Schedule and track vehicle maintenance and repairs."
      breadcrumbs={[{ label: 'Maintenance' }]}
      icon={Wrench}
    />
  );
}
