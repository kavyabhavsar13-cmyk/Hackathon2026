import { Router } from 'express';
import { authMiddleware } from '#middleware/authMiddleware';
import { validate } from '#middleware/validate';
import { createTripSchema, updateTripSchema } from '#validators/trip.validator';
import { getTrips, getTrip, createTrip, updateTrip, deleteTrip } from '#controllers/trip.controller';

const router = Router();

router.use(authMiddleware);

router.get('/', getTrips);
router.get('/:id', getTrip);
router.post('/', validate(createTripSchema), createTrip);
router.patch('/:id', validate(updateTripSchema), updateTrip);
router.delete('/:id', deleteTrip);

export default router;
