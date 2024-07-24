import express from 'express';
import { authMiddleware, checkRole } from '../middlewares/authMiddleware';
import { createDonation, getAllDonations, getMonthlyDonations, getUserDonations } from '../controllers/donationController';

const router = express.Router();

// Volunteer routes
router.post('/create', authMiddleware, checkRole(['volunteer']), createDonation);
router.get('/user/:userId', authMiddleware, checkRole(['volunteer']), getUserDonations);

// Admin routes
// router.get('/all', authMiddleware, checkRole(['admin']), getAllDonations);
router.get('/all', authMiddleware, checkRole(['admin']), getAllDonations);

router.get('/donations/monthly', getMonthlyDonations);

export default router;
