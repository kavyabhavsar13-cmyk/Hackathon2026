import { Router } from 'express';
import { authMiddleware } from '#middleware/authMiddleware';
import {
  getFuelEfficiencyReport,
  getFleetUtilizationReport,
  getOperationalCostReport,
  getVehicleROIReport,
} from '#controllers/report.controller';

const router = Router();

router.use(authMiddleware);

router.get('/fuel-efficiency', getFuelEfficiencyReport);
router.get('/fleet-utilization', getFleetUtilizationReport);
router.get('/operational-cost', getOperationalCostReport);
router.get('/vehicle-roi', getVehicleROIReport);

export default router;
