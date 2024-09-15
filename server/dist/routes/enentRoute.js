"use strict";
// // src/routes/opportunityRoutes.ts
// import express from 'express';
// import { createVolunteerOpportunity, deleteVolunteerOpportunity, getVolunteerOpportunities, updateVolunteerOpportunity } from '../controllers/eventController';
// import { authMiddeleware } from '../middlewares/authMiddleware';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const s3_1 = __importDefault(require("../config/s3"));
const router = express_1.default.Router();
// Organization routes
router.post('/create', authMiddleware_1.authMiddleware, s3_1.default.single('image'), (0, authMiddleware_1.checkRole)(['organization']), eventController_1.createEvent);
router.put('/edit/:id', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkRole)(['organization']), eventController_1.editEvent);
router.delete('/:id', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkRole)(['organization', 'admin']), eventController_1.deleteEvent);
// router.get('/events', getVolunteerOpportunities)
// Admin routes
router.get('/all', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkRole)(['admin', 'volunteer']), eventController_1.getEvents);
router.delete('/:id', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkRole)(['admin']), eventController_1.deleteEvent);
// Volunteer routes
// router.post('/participate/:id', authMiddleware, checkRole(['volunteer']), participateEvent);
// router.get('participated/:volunteerId', authMiddleware, checkRole(['volunteer']), getParticipatedEvents);
// Volunteer routes
router.post('/participate/:eventId', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkRole)(['volunteer']), eventController_1.participateEvent);
router.get('/participated/:userId', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkRole)(['volunteer']), eventController_1.getParticipatedEvents);
// Additional routes for organization-specific actions
router.get('/organization', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkRole)(['organization']), eventController_1.getOrganizationEvents);
// Route to get monthly event counts
router.get('/events/monthly', eventController_1.getMonthlyEventCount);
// Route to get monthly donations
// router.get('/donations/monthly', getMonthlyDonations);
// Route to get event type distribution
router.get('/events/types', eventController_1.getEventTypeDistribution);
exports.default = router;
