import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 dark:bg-primary p-4 justify-center">
      <h1 className="text-primary font-bold text-3xl md:text-2xl dark:text-secondary p-6 w-[40rem] ">About Us</h1>
      <p className="mb-4 text-primary  dark:text-secondary ">
        Welcome to our Volunteer Management System project! We are dedicated to building a platform that facilitates efficient volunteer management for organizations and provides a seamless volunteering experience for volunteers.
      </p>
      <p className="mb-4 text-primary  dark:text-secondary">
        Our mission is to connect volunteers with organizations that align with their interests and skills, making it easier for both parties to collaborate and make a positive impact in their communities.
      </p>
      <p className="mb-4 text-primary  dark:text-secondary">
        Thank you for joining us on this journey to build a better world through volunteerism!
      </p>
      <div className="flex w-full items-center md:flex-row  h-screen ">
        <div className="border-third border-4 ">
          <img src="images/Home_Image.png" className="w-[45rem] h-[35rem] p-2 " alt="Home" />
        </div>
        <div className="border-third border-4 ">
          <img src="images/Home_Image.png" className="w-[45rem] h-[35rem] p-2 " alt="Home" />
        </div>
        <div className="border-third border-4 ">
          <img src="images/Home_Image.png" className="w-[45rem] h-[35rem] p-2 " alt="Home" />
        </div>
      </div>
    </div>
  );
};

export default About;
