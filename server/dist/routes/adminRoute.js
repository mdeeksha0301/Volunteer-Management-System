"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminMiddleware_1 = require("../middlewares/adminMiddleware");
// import { getVolunteerOpportunities } from '../controllers/eventController';
const router = express_1.default.Router();
// router.get('/volunteer',authMiddeleware, adminMiddleware, getVolunteer);
// router.get('/organizaton', authMiddeleware, adminMiddleware, getOrganizations);
// router.delete('/user', authMiddeleware, adminMiddleware, deleteVolunteerController);
// Event Routes
router.get('/events', authMiddleware_1.authMiddleware, adminController_1.getEvents);
// router.get('/events', getVolunteerOpportunities);
router.delete('/events/:id', authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, adminController_1.deleteEvent);
// Donation Routes
router.get('/donations', adminController_1.getDonations);
router.delete('/donations/:id', authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, adminController_1.deleteDonation);
// Organization Routes
router.get('/organizations', adminController_1.getOrganizations);
router.delete('/organizations/:id', authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, adminController_1.deleteOrganization);
// Volunteer Routes
router.get('/volunteer', adminController_1.getVolunteers);
router.delete('/volunteer/:id', authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, adminController_1.deleteVolunteer);
router.get('/admin/users', adminController_1.getUsers);
router.delete('/admin/users/:id', adminController_1.deleteUser);
exports.default = router;
