import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code'; // Ensure the package is installed
import Modal from 'react-modal'; // Ensure the package is installed
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Ensure the package is installed

// Modal styling for React Modal
Modal.setAppElement('#root'); // Make sure to include this in your main index file

const PaymentForm: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const [upiLink, setUpiLink] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsModalOpen(true);
    try {
      // Simulate payment initiation
      setTimeout(() => {
        // Simulate payment success or failure
        const isSuccess = Math.random() > 0.5; // Randomly choose success or failure
        setPaymentSuccess(isSuccess);

        if (isSuccess) {
          setPaymentUrl('http://example.com/payment-success'); // Example success URL
          setQrData('example-qr-data'); // Example QR data (Ensure this is valid)
          setUpiLink(`upi://pay?pa=${upiId}&pn=Name&mc=1234&tid=1234567890&tn=Payment&am=${amount}&cu=INR&url=https://example.com`);
        } else {
          setTimeout(() => {
            navigate('/'); // Redirect to main page on failure
          }, 2000); // Delay redirection to allow modal display
        }
      }, 2000); // Simulate processing time
    } catch (error) {
      console.error('Payment initiation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter amount"
          />
        </div>
        {amount && (
          <div className="mb-4 flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">
                UPI ID
              </label>
              <input
                type="text"
                id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter UPI ID"
              />
            </div>
            {qrData && (
              <div className="flex-1 flex items-center justify-center">
                <QRCode value={qrData} size={128} />
              </div>
            )}
          </div>
        )}
       
        <button
          type="submit"
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading || !amount}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>

      {/* Payment processing modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          if (paymentSuccess === false) navigate('/'); // Redirect to main page if payment failed
        }}
        contentLabel="Payment Processing"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-md shadow-md text-center">
          {paymentSuccess === null ? (
            <div className="text-lg font-semibold">Processing Payment...</div>
          ) : paymentSuccess ? (
            <div>
              <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
              <div className="text-lg font-semibold mt-4">Payment Successful</div>
            </div>
          ) : (
            <div>
              <FaTimesCircle className="text-red-500 text-6xl mx-auto" />
              <div className="text-lg font-semibold mt-4">Payment Failed</div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PaymentForm;
