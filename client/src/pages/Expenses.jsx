import { Receipt } from 'lucide-react';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export default function Expenses() {
  return (
    <PlaceholderPage
      title="Expenses"
      description="Track tolls, fines, and other operational expenses."
      breadcrumbs={[{ label: 'Expenses' }]}
      icon={Receipt}
    />
  );
}
