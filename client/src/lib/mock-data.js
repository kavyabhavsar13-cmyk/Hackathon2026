export const kpiData = [
  { id: 'active-vehicles', label: 'Active Vehicles', value: '48', delta: '+4', trend: 'up' },
  { id: 'available-vehicles', label: 'Available Vehicles', value: '31', delta: '-2', trend: 'down' },
  { id: 'vehicles-in-maintenance', label: 'Vehicles in Maintenance', value: '6', delta: '+1', trend: 'up' },
  { id: 'active-trips', label: 'Active Trips', value: '19', delta: '+3', trend: 'up' },
  { id: 'drivers-on-duty', label: 'Drivers On Duty', value: '27', delta: '0', trend: 'flat' },
  { id: 'fleet-utilization', label: 'Fleet Utilization', value: '78%', delta: '+5%', trend: 'up' },
  { id: 'fuel-cost', label: 'Fuel Cost (MTD)', value: '₹4.2L', delta: '+8%', trend: 'up' },
  { id: 'operational-cost', label: 'Operational Cost (MTD)', value: '₹7.8L', delta: '-3%', trend: 'down' },
];

export const fleetUtilizationTrend = [
  { month: 'Jan', utilization: 62 },
  { month: 'Feb', utilization: 65 },
  { month: 'Mar', utilization: 68 },
  { month: 'Apr', utilization: 71 },
  { month: 'May', utilization: 69 },
  { month: 'Jun', utilization: 74 },
  { month: 'Jul', utilization: 78 },
];

export const fuelCostTrend = [
  { month: 'Jan', cost: 320000 },
  { month: 'Feb', cost: 298000 },
  { month: 'Mar', cost: 341000 },
  { month: 'Apr', cost: 355000 },
  { month: 'May', cost: 372000 },
  { month: 'Jun', cost: 360000 },
  { month: 'Jul', cost: 420000 },
];

export const vehicleStatusBreakdown = [
  { status: 'Available', count: 31 },
  { status: 'On Trip', count: 19 },
  { status: 'In Shop', count: 6 },
  { status: 'Retired', count: 3 },
];

export const tripActivity = [
  { day: 'Mon', trips: 14 },
  { day: 'Tue', trips: 18 },
  { day: 'Wed', trips: 16 },
  { day: 'Thu', trips: 21 },
  { day: 'Fri', trips: 25 },
  { day: 'Sat', trips: 12 },
  { day: 'Sun', trips: 8 },
];

export const recentTrips = [
  { id: 'TRP-1042', vehicle: 'GJ01AB1234', driver: 'Raj Mehta', destination: 'Ahmedabad', status: 'Dispatched' },
  { id: 'TRP-1041', vehicle: 'GJ05CD5678', driver: 'Priya Shah', destination: 'Surat', status: 'Completed' },
  { id: 'TRP-1040', vehicle: 'GJ03EF9012', driver: 'Amit Patel', destination: 'Vadodara', status: 'Completed' },
  { id: 'TRP-1039', vehicle: 'GJ01AB1234', driver: 'Raj Mehta', destination: 'Rajkot', status: 'Cancelled' },
  { id: 'TRP-1038', vehicle: 'GJ07GH3456', driver: 'Sneha Joshi', destination: 'Bhavnagar', status: 'Draft' },
];

export const alerts = [
  {
    id: 'alert-1',
    type: 'maintenance',
    title: 'Vehicle maintenance due',
    description: 'GJ01AB1234 is due for scheduled maintenance in 2 days.',
  },
  {
    id: 'alert-2',
    type: 'license',
    title: 'License expiry reminder',
    description: "Driver Amit Patel's license expires on 28 Jul 2026.",
  },
  {
    id: 'alert-3',
    type: 'utilization',
    title: 'Low fleet utilization',
    description: 'Utilization dropped below 70% in the Rajkot region this week.',
  },
];

export const notifications = [
  { id: 'notif-1', title: 'Trip TRP-1042 dispatched', time: '5m ago' },
  { id: 'notif-2', title: 'Maintenance completed on GJ05CD5678', time: '1h ago' },
  { id: 'notif-3', title: "Driver license expiring soon", time: '3h ago' },
];
