import express from 'express';
import { registerUser, loginUser, currentUser, logoutUser } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/current-user', authMiddleware, currentUser);
router.post('/logout', logoutUser); 

export default router;
