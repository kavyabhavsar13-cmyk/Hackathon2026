import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartTooltip } from '@/components/charts/ChartTooltip';
import { vehicleStatusBreakdown } from '@/lib/mock-data';

const COLORS = ['var(--viz-series-1)', 'var(--viz-series-2)', 'var(--viz-series-3)', 'var(--viz-series-4)'];

function renderLegendText(value, entry) {
  return (
    <span style={{ color: 'var(--muted-foreground)' }}>
      {value} ({entry.payload.count})
    </span>
  );
}

export function VehicleStatusPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Status</CardTitle>
        <CardDescription>Current breakdown of the fleet by status</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={vehicleStatusBreakdown} dataKey="count" nameKey="status" innerRadius={48} outerRadius={72} paddingAngle={2}>
              {vehicleStatusBreakdown.map((entry, index) => (
                <Cell key={entry.status} fill={COLORS[index % COLORS.length]} stroke="var(--card)" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
            <Legend verticalAlign="bottom" height={24} iconType="circle" formatter={renderLegendText} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
