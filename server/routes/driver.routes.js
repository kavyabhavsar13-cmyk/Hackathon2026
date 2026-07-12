import { Router } from 'express';
import { authMiddleware } from '#middleware/authMiddleware';
import { validate } from '#middleware/validate';
import { createDriverSchema, updateDriverSchema } from '#validators/driver.validator';
import { getDrivers, getDriver, createDriver, updateDriver, deleteDriver } from '#controllers/driver.controller';

const router = Router();

router.use(authMiddleware);

router.get('/', getDrivers);
router.get('/:id', getDriver);
router.post('/', validate(createDriverSchema), createDriver);
router.patch('/:id', validate(updateDriverSchema), updateDriver);
router.delete('/:id', deleteDriver);

export default router;
