import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.post('/login', AuthController.login);

// Protected routes
router.get('/me', authMiddleware, AuthController.me);

export default router; 