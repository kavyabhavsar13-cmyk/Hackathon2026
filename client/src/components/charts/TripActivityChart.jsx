import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartTooltip } from '@/components/charts/ChartTooltip';
import { tripActivity } from '@/lib/mock-data';

export function TripActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Activity</CardTitle>
        <CardDescription>Trips dispatched per day this week</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={tripActivity} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="tripActivityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--viz-series-1)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--viz-series-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: 'var(--viz-baseline)' }}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              width={32}
              allowDecimals={false}
            />
            <Tooltip
              content={<ChartTooltip valueFormatter={(value) => `${value} trips`} />}
              cursor={{ stroke: 'var(--viz-baseline)', strokeDasharray: '3 3' }}
            />
            <Area type="monotone" dataKey="trips" name="Trips" stroke="var(--viz-series-1)" strokeWidth={2} fill="url(#tripActivityFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
