import { Router } from 'express';
import { authMiddleware } from '#middleware/authMiddleware';
import { validate } from '#middleware/validate';
import { createMaintenanceSchema, updateMaintenanceSchema } from '#validators/maintenance.validator';
import {
  getMaintenanceRecords,
  getMaintenanceRecord,
  createMaintenanceRecord,
  updateMaintenanceRecord,
  deleteMaintenanceRecord,
} from '#controllers/maintenance.controller';

const router = Router();

router.use(authMiddleware);

router.get('/', getMaintenanceRecords);
router.get('/:id', getMaintenanceRecord);
router.post('/', validate(createMaintenanceSchema), createMaintenanceRecord);
router.patch('/:id', validate(updateMaintenanceSchema), updateMaintenanceRecord);
router.delete('/:id', deleteMaintenanceRecord);

export default router;
