import { Router } from 'express';
import { registerUser, loginUser, getMe, changePassword } from '#controllers/auth.controller';
import { validate } from '#middleware/validate';
import { authMiddleware } from '#middleware/authMiddleware';
import { registerSchema, loginSchema, changePasswordSchema } from '#validators/auth.validator';

const router = Router();

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.get('/me', authMiddleware, getMe);
router.patch('/change-password', authMiddleware, validate(changePasswordSchema), changePassword);

export default router;
