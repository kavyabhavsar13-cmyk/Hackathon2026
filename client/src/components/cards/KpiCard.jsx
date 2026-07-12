import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus };
const TREND_COLOR = {
  up: 'text-emerald-600 dark:text-emerald-400',
  down: 'text-red-600 dark:text-red-400',
  flat: 'text-muted-foreground',
};

export function KpiCard({ label, value, delta, trend = 'flat', icon: Icon }) {
  const TrendIcon = TREND_ICON[trend] ?? Minus;

  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          <span className="font-heading text-2xl font-semibold tracking-tight">{value}</span>
          {delta && (
            <span className={cn('inline-flex items-center gap-1 text-xs font-medium', TREND_COLOR[trend])}>
              <TrendIcon className="size-3.5" />
              {delta}
            </span>
          )}
        </div>
        {Icon && (
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
