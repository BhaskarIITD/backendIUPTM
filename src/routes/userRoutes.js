import express from 'express';
const router = express.Router();
import { updatePayment, getStatus } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.put('/payment', protect, updatePayment);
router.get('/status', protect, getStatus);

export default router;
