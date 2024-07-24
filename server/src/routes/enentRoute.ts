// // src/routes/opportunityRoutes.ts
// import express from 'express';
// import { createVolunteerOpportunity, deleteVolunteerOpportunity, getVolunteerOpportunities, updateVolunteerOpportunity } from '../controllers/eventController';
// import { authMiddeleware } from '../middlewares/authMiddleware';

// const router = express.Router();


// router.post('/new-opportunities', authMiddeleware, createVolunteerOpportunity);
// router.get('/opportunities', getVolunteerOpportunities);
// router.get('/my-opportunities/:userId', authMiddeleware, getVolunteerOpportunities);
// // router.post('/register', authMiddeleware, registerForEvent);
// router.put('/update/:eventId', authMiddeleware, updateVolunteerOpportunity); // Update a specific event
// router.delete('/delete/:eventId', authMiddeleware, deleteVolunteerOpportunity); 



// export default router;

// import express from 'express';
// import { createVolunteerOpportunity, getVolunteerOpportunities } from '../controllers/eventController';
// import { authMiddeleware } from '../middlewares/authMiddleware';

// const router = express.Router();

// router.post('/new-opportunities', authMiddeleware, createVolunteerOpportunity);
// router.get('/opportunities', getVolunteerOpportunities);
// router.get('/my-opportunities/:userId', authMiddeleware, getVolunteerOpportunities);
// // router.put('/update/:eventId', authMiddeleware, updateVolunteerOpportunity);
// // router.delete('/delete/:eventId', authMiddeleware, deleteVolunteerOpportunity);

// export default router;

import express from 'express';
import { createEvent, getEvents, deleteEvent, participateEvent, editEvent, getOrganizationEvents, getParticipatedEvents, getMonthlyEventCount, getEventTypeDistribution } from '../controllers/eventController';
import { authMiddleware, checkRole } from '../middlewares/authMiddleware';
import upload from '../config/s3';

const router = express.Router();

// Organization routes
router.post('/create', authMiddleware, upload.single('image'),checkRole(['organization']), createEvent);
router.put('/edit/:id', authMiddleware, checkRole(['organization']), editEvent);
router.delete('/:id', authMiddleware, checkRole(['organization','admin']), deleteEvent);
// router.get('/events', getVolunteerOpportunities)

// Admin routes
router.get('/all', authMiddleware, checkRole(['admin', 'volunteer']), getEvents);
router.delete('/:id', authMiddleware, checkRole(['admin']), deleteEvent);

// Volunteer routes
// router.post('/participate/:id', authMiddleware, checkRole(['volunteer']), participateEvent);
// router.get('participated/:volunteerId', authMiddleware, checkRole(['volunteer']), getParticipatedEvents);

// Volunteer routes
router.post('/participate/:eventId', authMiddleware, checkRole(['volunteer']), participateEvent);
router.get('/participated/:userId', authMiddleware, checkRole(['volunteer']), getParticipatedEvents);


// Additional routes for organization-specific actions
router.get('/organization', authMiddleware, checkRole(['organization']), getOrganizationEvents);

// Route to get monthly event counts
router.get('/events/monthly', getMonthlyEventCount);

// Route to get monthly donations
// router.get('/donations/monthly', getMonthlyDonations);

// Route to get event type distribution
router.get('/events/types', getEventTypeDistribution);

export default router;

