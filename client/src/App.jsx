import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AppLayout } from '@/layouts/AppLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Vehicles from '@/pages/Vehicles';
import Drivers from '@/pages/Drivers';
import Trips from '@/pages/Trips';
import Maintenance from '@/pages/Maintenance';
import FuelLogs from '@/pages/FuelLogs';
import Expenses from '@/pages/Expenses';
import Reports from '@/pages/Reports';
import AIFleetAssistant from '@/pages/AIFleetAssistant';
import Settings from '@/pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/fuel-logs" element={<FuelLogs />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/ai-assistant" element={<AIFleetAssistant />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
