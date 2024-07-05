import express from 'express';
import { deleteDonation, deleteEvent, deleteOrganization, deleteUser, deleteVolunteer, getDonations, getEvents, getOrganizations, getUsers, getVolunteers } from '../controllers/adminController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware} from '../middlewares/adminMiddleware'
// import { getVolunteerOpportunities } from '../controllers/eventController';

const router = express.Router();

// router.get('/volunteer',authMiddeleware, adminMiddleware, getVolunteer);
// router.get('/organizaton', authMiddeleware, adminMiddleware, getOrganizations);
// router.delete('/user', authMiddeleware, adminMiddleware, deleteVolunteerController);

// Event Routes
router.get('/events', authMiddleware,  getEvents);
// router.get('/events', getVolunteerOpportunities);
router.delete('/events/:id', authMiddleware, adminMiddleware, deleteEvent);


// Donation Routes
router.get('/donations', getDonations);
router.delete('/donations/:id', authMiddleware, adminMiddleware, deleteDonation);

// Organization Routes
router.get('/organizations', getOrganizations);
router.delete('/organizations/:id', authMiddleware, adminMiddleware, deleteOrganization);

// Volunteer Routes
router.get('/volunteer', getVolunteers);
router.delete('/volunteer/:id', authMiddleware, adminMiddleware, deleteVolunteer);

router.get('/admin/users', getUsers);
router.delete('/admin/users/:id', deleteUser);

export default router;