import { BarChart3 } from 'lucide-react';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export default function Reports() {
  return (
    <PlaceholderPage
      title="Reports"
      description="Fuel efficiency, fleet utilization, operational cost, and ROI reports."
      breadcrumbs={[{ label: 'Reports' }]}
      icon={BarChart3}
    />
  );
}
