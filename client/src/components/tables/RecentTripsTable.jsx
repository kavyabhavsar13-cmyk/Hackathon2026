import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { recentTrips } from '@/lib/mock-data';

const STATUS_VARIANT = {
  Draft: 'outline',
  Dispatched: 'default',
  Completed: 'secondary',
  Cancelled: 'destructive',
};

export function RecentTripsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Trips</CardTitle>
        <CardDescription>Latest trips across the fleet</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trip ID</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTrips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell className="font-medium">{trip.id}</TableCell>
                <TableCell>{trip.vehicle}</TableCell>
                <TableCell>{trip.driver}</TableCell>
                <TableCell>{trip.destination}</TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[trip.status] ?? 'outline'}>{trip.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
