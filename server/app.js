import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import healthRoutes from '#routes/health.routes';
import authRoutes from '#routes/auth.routes';
import vehicleRoutes from '#routes/vehicle.routes';
import driverRoutes from '#routes/driver.routes';
import tripRoutes from '#routes/trip.routes';
import maintenanceRoutes from '#routes/maintenance.routes';
import fuelRoutes from '#routes/fuel.routes';
import expenseRoutes from '#routes/expense.routes';
import reportRoutes from '#routes/report.routes';
import { notFound } from '#middleware/notFound';
import { errorHandler } from '#middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
