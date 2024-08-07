// import User from "../models/User";
// import { Request, Response, NextFunction } from 'express';

// export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await User.findById(req.body.userId);
//     //check admin
//     if (user?.role !== "admin") {
//       return res.status(401).send({
//         success: false,
//         message: "Auth Fialed",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(401).send({
//       success: false,
//       message: "Auth Failed, ADMIN API",
//       error,
//     });
//   }
// };

import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user; // Assuming user is set by verifyToken or authMiddleware

    // Check if user is admin
    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Auth Failed",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed, ADMIN API",
      error,
    });
  }
};
