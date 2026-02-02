import express from 'express';
const router = express.Router();
import { getAllUsers, verifyPayment } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/users', protect, admin, getAllUsers);
router.post('/verify', protect, admin, verifyPayment);

export default router;
