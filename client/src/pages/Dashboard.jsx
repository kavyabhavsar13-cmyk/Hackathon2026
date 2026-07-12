import { Truck, CheckCircle2, Wrench, Route, IdCard, Gauge, Fuel, Wallet } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { KpiCard } from '@/components/cards/KpiCard';
import { AlertCard } from '@/components/cards/AlertCard';
import { FleetUtilizationLineChart } from '@/components/charts/FleetUtilizationLineChart';
import { FuelCostBarChart } from '@/components/charts/FuelCostBarChart';
import { VehicleStatusPieChart } from '@/components/charts/VehicleStatusPieChart';
import { TripActivityChart } from '@/components/charts/TripActivityChart';
import { RecentTripsTable } from '@/components/tables/RecentTripsTable';
import { kpiData, alerts } from '@/lib/mock-data';

const KPI_ICONS = {
  'active-vehicles': Truck,
  'available-vehicles': CheckCircle2,
  'vehicles-in-maintenance': Wrench,
  'active-trips': Route,
  'drivers-on-duty': IdCard,
  'fleet-utilization': Gauge,
  'fuel-cost': Fuel,
  'operational-cost': Wallet,
};

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard" description="A live snapshot of your fleet's health and activity." breadcrumbs={[{ label: 'Dashboard' }]} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} value={kpi.value} delta={kpi.delta} trend={kpi.trend} icon={KPI_ICONS[kpi.id]} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FleetUtilizationLineChart />
        <FuelCostBarChart />
        <VehicleStatusPieChart />
        <TripActivityChart />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentTripsTable />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-sm font-semibold text-foreground">Alerts</h2>
          {alerts.map((alert) => (
            <AlertCard key={alert.id} type={alert.type} title={alert.title} description={alert.description} />
          ))}
        </div>
      </div>
    </div>
  );
}
