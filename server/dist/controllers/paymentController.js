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
exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const initiatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
    }
    try {
        const response = yield axios_1.default.post('https://api-preprod.phonepe.com/apis/pg-sandbox', {
            amount,
            merchantId: 'PGTESTPAYUAT',
            keyIndex: '1',
            saltKey: '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399',
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { paymentUrl, qrData, upiLink } = response.data;
        res.json({ paymentUrl, qrData, upiLink });
    }
    catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ error: 'Failed to initiate payment' });
    }
});
exports.initiatePayment = initiatePayment;
