import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 dark:bg-primary p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-primary font-bold text-3xl md:text-4xl dark:text-secondary mb-8 text-center">
          About Us
        </h1>
        <div className="text-center mb-8">
          <p className="mb-4 text-primary dark:text-secondary">
            Welcome to our Volunteer Management System project! We are dedicated to building a platform that facilitates efficient volunteer management for organizations and provides a seamless volunteering experience for volunteers.
          </p>
          <p className="mb-4 text-primary dark:text-secondary">
            Our mission is to connect volunteers with organizations that align with their interests and skills, making it easier for both parties to collaborate and make a positive impact in their communities.
          </p>
          <p className="mb-4 text-primary dark:text-secondary">
            Thank you for joining us on this journey to build a better world through volunteerism!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border-third border-4 rounded-lg overflow-hidden">
            <img src="images/Home_Image.png" className="w-full h-[25rem] object-cover" alt="About Us Image 1" />
          </div>
          <div className="border-third border-4 rounded-lg overflow-hidden">
            <img src="images/Home_Image.png" className="w-full h-[25rem] object-cover" alt="About Us Image 2" />
          </div>
          <div className="border-third border-4 rounded-lg overflow-hidden">
            <img src="images/Home_Image.png" className="w-full h-[25rem] object-cover" alt="About Us Image 3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
