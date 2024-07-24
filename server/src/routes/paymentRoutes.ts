// src/routes/paymentRoutes.ts
import { Router } from 'express';
import { initiatePayment } from '../controllers/paymentController';

const router = Router();

// Route to initiate payment
router.post('/initiate-payment', initiatePayment);

export default router;
