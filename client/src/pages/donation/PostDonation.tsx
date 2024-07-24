// import React, { useState } from 'react';

// interface DonationBoxProps {
//   title: string;
//   description: string;
//   buttonText: string;
//   amountOptions?: number[];
//   [key: string]: any;
// }



// const PostDonation = () => {

//   const [donationAmount, setDonationAmount] = useState('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setDonationAmount(e.target.value);
//   };

//   const handlePresetAmount = (amount: number) => {
//     setDonationAmount(amount.toString());
//   };

//   const handleSubmit = () => {
//     // Logic to process the donation (e.g., send to server)
//     console.log(`Donating $${donationAmount}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Hero Section */}
//       <section className="relative bg-cover bg-center py-32">
//         <img src="/your-hero-image.jpg" alt="Hero Image" className="hidden md:block absolute inset-0 object-cover" />
//         <div className="absolute inset-0 bg-black/50"></div>
//         <div className="container mx-auto text-center flex z-10">
//           <div className="container mx-auto text-center relative z-10">
//           <h1 className="text-6xl font-bold text-white">ATN those who read</h1>
//           <p className="text-2xl text-white mt-4">Each donation is an essential help for everyone's life</p>
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded mt-6">Donate Now</button>
//           </div>
         
//           <div className="container mx-auto mt-10 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md z-10">
//       <h2 className="text-xl font-semibold mb-4">Donate to Our Cause</h2>
//       <p className="text-center mb-4">Help us make a difference by donating.</p>
//       <input
//         type="number"
//         value={donationAmount}
//         onChange={handleInputChange}
//         placeholder="Enter your amount"
//         className="w-full p-2 border rounded-md mb-4"
//       />
//       <div className="flex space-x-3">
//         <button onClick={() => handlePresetAmount(50)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
//           $10
//         </button>
//         <button onClick={() => handlePresetAmount(250)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
//           $20
//         </button>
//         <button onClick={() => handlePresetAmount(1000)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
//           $50
//         </button>
//         <button onClick={() => handlePresetAmount(1000)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
//           $100
//         </button>
//       </div>
//       <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto">
//         Donate Now
//       </button>
//     </div>
          
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="py-20">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <img src="/image1.jpg" alt="Image 1" className="w-full rounded-lg" />
//             </div>
//             <div>
//               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Impact Section */}
//       <section className="py-20 bg-gray-200">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-8">Make an Impact</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Card 1 */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//             <img src="/path/to/donation-icon.png" alt="Donation" className="w-12 h-12 mb-2" />
//               <h3 className="text-xl font-bold mb-2">Volunteer Opportunities</h3>
//               <p>Support our educational programs to empower children.</p>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
//             Donate Now
//           </button>
//             </div>
//             {/* Card 2 */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//             <img src="/path/to/donation-icon.png" alt="Donation" className="w-12 h-12 mb-2" />
//               <h3 className="text-xl font-bold mb-2">Education for Every Child</h3>
//               <p>Join our team of dedicated volunteers and make a difference.</p>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
//             Donate Now
//           </button>
//             </div>
//             {/* Card 3 */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//             <img src="/path/to/donation-icon.png" alt="Donation" className="w-12 h-12 mb-2" />
//               <h3 className="text-xl font-bold mb-2">Impact 3</h3>
//               <p>Join our team of dedicated volunteers and make a difference.</p>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
//             Donate Now
//           </button>
//             </div>
//           </div>
//         </div>
       
//       </section>

//       {/* Newsletter Section */}
//       <section className="py-20">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
//           <form>
//             <input type="email" placeholder="Your Email" className="border border-gray-300 p-4 rounded" />
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Subscribe</button>
//           </form>
//         </div>
//       </section>

     
//     </div>
//   );
// }

// export default PostDonation;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostDonation: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const navigate = useNavigate();

  const handleDonateClick = (amount: number) => {
    setDonationAmount(amount);
    navigate('/payment-form', { state: { amount } }); // Navigate to PaymentForm page
  };

  const handleCustomDonateClick = () => {
    if (customAmount) {
      handleDonateClick(Number(customAmount));
      setIsModalOpen(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-32">
        <img src="/your-hero-image.jpg" alt="Hero" className="hidden md:block absolute inset-0 object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto text-center flex z-10">
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-6xl font-bold text-white">ATN those who read</h1>
            <p className="text-2xl text-white mt-4">Each donation is an essential help for everyone's life</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded mt-6"
              onClick={() => handleDonateClick(100)} // Example amount
            >
              Donate Now
            </button>
          </div>

          <div className="container mx-auto mt-10 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md z-10">
            <h2 className="text-xl font-semibold mb-4">Donate to Our Cause</h2>
            <p className="text-center mb-4">Help us make a difference by donating.</p>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter your amount"
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => handleDonateClick(10)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
              >
                $10
              </button>
              <button
                onClick={() => handleDonateClick(20)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
              >
                $20
              </button>
              <button
                onClick={() => handleDonateClick(50)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
              >
                $50
              </button>
              <button
                onClick={() => handleDonateClick(100)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
              >
                $100
              </button>
            </div>
            <button
              onClick={() => handleDonateClick(Number(customAmount))}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gray-200">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Make an Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/path/to/donation-icon.png" alt="Donation" className="w-12 h-12 mb-2" />
              <h3 className="text-xl font-bold mb-2">Volunteer Opportunities</h3>
              <p>Support our educational programs to empower children.</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
                onClick={openModal}
              >
                Donate Now
              </button>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/path/to/donation-icon.png" alt="Donation" className="w-12 h-12 mb-2" />
              <h3 className="text-xl font-bold mb-2">Education for Every Child</h3>
              <p>Join our team of dedicated volunteers and make a difference.</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
                onClick={openModal}
              >
                Donate Now
              </button>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img src="/path/to/donation-icon.png" alt="Donation" className="w-12 h-12 mb-2" />
              <h3 className="text-xl font-bold mb-2">Impact 3</h3>
              <p>Join our team of dedicated volunteers and make a difference.</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
                onClick={openModal}
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Custom Amount */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">Enter Custom Donation Amount</h2>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter your amount"
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleCustomDonateClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Donate
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDonation;
