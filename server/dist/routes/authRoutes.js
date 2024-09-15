"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Routes
router.post('/register', authController_1.registerUser);
router.post('/login', authController_1.loginUser);
router.get('/current-user', authMiddleware_1.authMiddleware, authController_1.currentUser);
router.post('/logout', authController_1.logoutUser);
exports.default = router;
