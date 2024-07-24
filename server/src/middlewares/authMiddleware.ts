import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     try {
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//         req.body.userId = decoded.userId;
//         const user = await User.findById(req.body.userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         req.body.user = user;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        req.body.userId = decoded.userId;
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.body.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export const checkRole = (roles: Array<string>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.body.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};
