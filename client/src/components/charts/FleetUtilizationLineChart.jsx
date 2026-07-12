import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartTooltip } from '@/components/charts/ChartTooltip';
import { fleetUtilizationTrend } from '@/lib/mock-data';

export function FleetUtilizationLineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fleet Utilization</CardTitle>
        <CardDescription>Monthly utilization rate across the active fleet</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={fleetUtilizationTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: 'var(--viz-baseline)' }}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              width={40}
            />
            <Tooltip
              content={<ChartTooltip valueFormatter={(value) => `${value}%`} />}
              cursor={{ stroke: 'var(--viz-baseline)', strokeDasharray: '3 3' }}
            />
            <Line
              type="monotone"
              dataKey="utilization"
              name="Utilization"
              stroke="var(--viz-series-1)"
              strokeWidth={2}
              dot={{ r: 3, fill: 'var(--viz-series-1)', strokeWidth: 2, stroke: 'var(--card)' }}
              activeDot={{ r: 5, strokeWidth: 2, stroke: 'var(--card)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
