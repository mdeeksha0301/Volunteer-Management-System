"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const donationController_1 = require("../controllers/donationController");
const router = express_1.default.Router();
// Volunteer routes
router.post('/create', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkRole)(['volunteer']), donationController_1.createDonation);
router.get('/user/:userId', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkRole)(['volunteer']), donationController_1.getUserDonations);
// Admin routes
// router.get('/all', authMiddleware, checkRole(['admin']), getAllDonations);
router.get('/all', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkRole)(['admin']), donationController_1.getAllDonations);
router.get('/donations/monthly', donationController_1.getMonthlyDonations);
exports.default = router;
