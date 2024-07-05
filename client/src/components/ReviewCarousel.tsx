import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewCarousel: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % reviews.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [reviews.length]);

  const getNextIndex = (index: number) => (index + 1) % reviews.length;

  return (
    <div className="carousel-container relative w-full max-w-2xl mx-auto">
      {reviews.length > 0 && (
        <>
          <div className="flex">
            {[currentIndex, getNextIndex(currentIndex)].map((index) => (
              <div
                key={index}
                className="carousel-item w-1/2 p-2 transition-opacity duration-1000"
              >
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">{reviews[index].user}</h3>
                  <p className="text-sm text-gray-500">{new Date(reviews[index].date).toLocaleDateString()}</p>
                  <p className="mt-2">{reviews[index].comment}</p>
                  <div className="mt-4">
                    {Array.from({ length: reviews[index].rating }, (_, i) => (
                      <span key={i} className="text-yellow-500">&#9733;</span>
                    ))}
                    {Array.from({ length: 5 - reviews[index].rating }, (_, i) => (
                      <span key={i} className="text-gray-300">&#9733;</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewCarousel;
