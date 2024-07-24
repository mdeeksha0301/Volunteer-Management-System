import { Request, Response } from 'express';
import axios from 'axios';

export const initiatePayment = async (req: Request, res: Response) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    const response = await axios.post('https://api-preprod.phonepe.com/apis/pg-sandbox', {
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
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
};
