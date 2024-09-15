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
exports.getMonthlyDonations = exports.getUserDonations = exports.getAllDonations = exports.createDonation = void 0;
const Donation_1 = __importDefault(require("../models/Donation"));
const User_1 = __importDefault(require("../models/User"));
// Create a donation (only for logged-in volunteers)
// export const createDonation = async (req: Request, res: Response) => {
//     try {
//         const { itemTypes, description, category, ageRange, pickupTime } = req.body;
//         const userId = req.body.user._id;
//         // Ensure the user is a volunteer
//         const user = await User.findById(userId);
//         if (!user || user.role !== 'volunteer') {
//             return res.status(403).json({ message: 'You do not have permission to make a donation' });
//         }
//         const donation = new Donation({
//             user: userId,
//             itemTypes,
//             description,
//             category,
//             ageRange,
//             pickupTime
//         });
//         await donation.save();
//         res.status(201).json({ message: 'Donation created successfully', donation });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
const createDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemTypes, description, pickupTime } = req.body;
        const userId = req.body.user._id; // Assuming you have the user ID from the authentication middleware
        // Fetch user details
        const user = yield User_1.default.findById(userId).select('userName');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        itemTypes.forEach((item) => {
            if (item.itemType === 'clothes' && (!item.category)) {
                return res.status(400).json({ message: 'Category is required for clothes donations.' });
            }
            if (item.category === 'children' && (!item.ageRange)) {
                return res.status(400).json({ message: 'Age range is required for children category.' });
            }
        });
        // Create donation
        const donation = new Donation_1.default({
            user: userId,
            itemTypes,
            description,
            pickupTime,
            donorName: user.userName // Use the user's name here
        });
        yield donation.save();
        res.status(201).json(donation);
    }
    catch (error) {
        console.error('Error creating donation:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createDonation = createDonation;
// Get all donations (admin only)
// Get all donations (Admin only)
const getAllDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donations = yield Donation_1.default.find().populate('user');
        const categorizedDonations = donations.reduce((acc, donation) => {
            const { category, itemType, quantity, user } = donation;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push({ itemType, quantity, user });
            return acc;
        }, {});
        res.status(200).json({ categorizedDonations });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllDonations = getAllDonations;
;
// Get donations by user (volunteer only)
const getUserDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const donations = yield Donation_1.default.find({ user: userId });
        res.status(200).json({ donations });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getUserDonations = getUserDonations;
// In your Donation Controller
const getMonthlyDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donations = yield Donation_1.default.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    total: { $sum: "$amount" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        res.status(200).json(donations);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getMonthlyDonations = getMonthlyDonations;
