import { Router } from 'express';
import { authMiddleware } from '#middleware/authMiddleware';
import { validate } from '#middleware/validate';
import { createFuelLogSchema, updateFuelLogSchema } from '#validators/fuel.validator';
import { getFuelLogs, getFuelLog, createFuelLog, updateFuelLog, deleteFuelLog } from '#controllers/fuel.controller';

const router = Router();

router.use(authMiddleware);

router.get('/', getFuelLogs);
router.get('/:id', getFuelLog);
router.post('/', validate(createFuelLogSchema), createFuelLog);
router.patch('/:id', validate(updateFuelLogSchema), updateFuelLog);
router.delete('/:id', deleteFuelLog);

export default router;
