import { Route } from 'lucide-react';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export default function Trips() {
  return (
    <PlaceholderPage
      title="Trips"
      description="Dispatch, track, and review trips across the fleet."
      breadcrumbs={[{ label: 'Trips' }]}
      icon={Route}
    />
  );
}
