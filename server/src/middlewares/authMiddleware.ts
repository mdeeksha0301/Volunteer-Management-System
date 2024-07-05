// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// interface AuthRequest extends Request {
//   user?: any;
// }

// export const authMiddeleware = (req: AuthRequest, res: Response, next: NextFunction) => {
//   // Get token from header
//   const authHeader = req.header('Authorization');
//   console.log('Authorization Header:', authHeader);

//   // if (!authHeader) {
//   //   return res.status(401).json({ message: 'Authorization header missing' });
//   // }
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Authorization header missing or invalid format' });
// }

//   const token = authHeader.split(' ')[1]; // Bearer token
//   console.log('Extracted Token:', token); // Log token

//   if (!token) {
//     return res.status(401).json({ message: 'Token missing' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET  || '');
//     console.log('Decoded Token:', decoded); 
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.log('Token Error:', err);
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

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
