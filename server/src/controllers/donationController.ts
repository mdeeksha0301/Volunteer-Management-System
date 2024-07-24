import { Request, Response } from 'express';
import Donation from '../models/Donation';
import User from '../models/User';

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

export const createDonation = async (req: Request, res: Response) => {
    try {
        const { itemTypes, description, pickupTime } = req.body;
        const userId = req.body.user._id; // Assuming you have the user ID from the authentication middleware

        // Fetch user details
        const user = await User.findById(userId).select('userName');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        itemTypes.forEach((item: any) => {
            if (item.itemType === 'clothes' && (!item.category)) {
                return res.status(400).json({ message: 'Category is required for clothes donations.' });
            }
            if (item.category === 'children' && (!item.ageRange)) {
                return res.status(400).json({ message: 'Age range is required for children category.' });
            }
        });

        // Create donation
        const donation = new Donation({
            user: userId,
            itemTypes,
            description,
            pickupTime,
            donorName: user.userName // Use the user's name here
        });

        await donation.save();

        res.status(201).json(donation);
    } catch (error) {
        console.error('Error creating donation:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all donations (admin only)
// Get all donations (Admin only)
export const getAllDonations = async (req: Request, res: Response) => {
    try {
        const donations = await Donation.find().populate('user');
        const categorizedDonations = donations.reduce((acc, donation) => {
            const { category, itemType, quantity, user } = donation;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push({ itemType, quantity, user });
            return acc;
        }, {} as Record<string, any[]>);

        res.status(200).json({ categorizedDonations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
;

// Get donations by user (volunteer only)
export const getUserDonations = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const donations = await Donation.find({ user: userId });
        res.status(200).json({ donations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// In your Donation Controller

export const getMonthlyDonations = async (req: Request, res: Response) => {
    try {
        const donations = await Donation.aggregate([
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

