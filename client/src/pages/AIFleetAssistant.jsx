import { Sparkles } from 'lucide-react';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export default function AIFleetAssistant() {
  return (
    <PlaceholderPage
      title="AI Fleet Assistant"
      description="Ask questions and get insights about your fleet."
      breadcrumbs={[{ label: 'AI Fleet Assistant' }]}
      icon={Sparkles}
    />
  );
}
