"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/paymentRoutes.ts
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
// Route to initiate payment
router.post('/initiate-payment', paymentController_1.initiatePayment);
exports.default = router;
