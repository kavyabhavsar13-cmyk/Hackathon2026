import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartTooltip } from '@/components/charts/ChartTooltip';
import { fuelCostTrend } from '@/lib/mock-data';

function formatCurrency(value) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${value}`;
}

export function FuelCostBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuel Cost</CardTitle>
        <CardDescription>Monthly fuel spend across the fleet</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={fuelCostTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
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
              tickFormatter={formatCurrency}
              width={48}
            />
            <Tooltip content={<ChartTooltip valueFormatter={formatCurrency} />} cursor={{ fill: 'var(--muted)' }} />
            <Bar dataKey="cost" name="Fuel cost" fill="var(--viz-series-1)" radius={[4, 4, 0, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
