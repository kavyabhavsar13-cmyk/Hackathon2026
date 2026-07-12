import { Router } from 'express';
import { authMiddleware } from '#middleware/authMiddleware';
import { validate } from '#middleware/validate';
import { createVehicleSchema, updateVehicleSchema } from '#validators/vehicle.validator';
import {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from '#controllers/vehicle.controller';

const router = Router();

router.use(authMiddleware);

router.get('/', getVehicles);
router.get('/:id', getVehicle);
router.post('/', validate(createVehicleSchema), createVehicle);
router.patch('/:id', validate(updateVehicleSchema), updateVehicle);
router.delete('/:id', deleteVehicle);

export default router;
