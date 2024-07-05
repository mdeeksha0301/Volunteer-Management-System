import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { role, userName, email, password, phoneNumber, organizationName } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({
            role,
            userName,
            email,
            password,
            phoneNumber,
            organizationName
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: 'Invalid Password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );
        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
          });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in login Api",
            error,
        })
    }
};


export const currentUser = async(req: Request, res: Response) => {
    try {
        const userId = req.body.userId; 
        const user = await User.findById(userId); 
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
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error finding current user",
            error,
        })
    }
};

// Logout route
export const logoutUser = (req: Request, res: Response) => {
    try {
        // On the client side, the token will be removed, effectively logging the user out.
        res.clearCookie('token');
        res.status(200).send({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error logging out',
            error,
        });
    }
};