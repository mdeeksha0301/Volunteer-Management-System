"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.currentUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, userName, email, password, phoneNumber, organizationName } = req.body;
        // Check if user already exists
        let user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        user = new User_1.default({
            role,
            userName,
            email,
            password,
            phoneNumber,
            organizationName
        });
        // Hash password
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(password, salt);
        // Save user to database
        yield user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        // Check if user exists
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid Email' });
        }
        // check role
        if (user.role !== role) {
            return res.status(500).send({
                success: false,
                message: "role dosent match",
            });
        }
        // Check password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: 'Invalid Password' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in login Api",
            error,
        });
    }
});
exports.loginUser = loginUser;
const currentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "User Found Successfully",
            user
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error finding current user",
            error,
        });
    }
});
exports.currentUser = currentUser;
// Logout route
const logoutUser = (req, res) => {
    try {
        // On the client side, the token will be removed, effectively logging the user out.
        res.clearCookie('token');
        res.status(200).send({
            success: true,
            message: 'Logged out successfully'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error logging out',
            error,
        });
    }
};
exports.logoutUser = logoutUser;
