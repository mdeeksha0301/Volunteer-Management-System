"use strict";
// import User from "../models/User";
// import { Request, Response, NextFunction } from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const adminMiddleware = (req, res, next) => {
    try {
        const user = req.user; // Assuming user is set by verifyToken or authMiddleware
        // Check if user is admin
        if ((user === null || user === void 0 ? void 0 : user.role) !== "admin") {
            return res.status(401).send({
                success: false,
                message: "Auth Failed",
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Auth Failed, ADMIN API",
            error,
        });
    }
};
exports.adminMiddleware = adminMiddleware;
