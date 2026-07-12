import { Wrench, IdCard, TrendingDown, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const ALERT_STYLES = {
  maintenance: { icon: Wrench, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
  license: { icon: IdCard, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10' },
  utilization: { icon: TrendingDown, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10' },
};

export function AlertCard({ type, title, description }) {
  const style = ALERT_STYLES[type] ?? { icon: AlertTriangle, color: 'text-muted-foreground', bg: 'bg-muted' };
  const Icon = style.icon;

  return (
    <Card>
      <CardContent className="flex items-start gap-3">
        <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', style.bg, style.color)}>
          <Icon className="size-5" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-sm text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}
