import React from 'react';
import { FaHome, FaPaw, FaUtensils, FaGraduationCap } from 'react-icons/fa';
import ReviewCarousel from '../../components/ReviewCarousel';

const useCases = [
  { title: 'Housing', description: 'Providing safe and comfortable living spaces for those in need.', icon: <FaHome className="text-4xl text-primary" /> },
  { title: 'Animal Welfare', description: 'Supporting and improving the lives of animals in our communities.', icon: <FaPaw className="text-4xl text-primary" /> },
  { title: 'Hunger Relief', description: 'Addressing food insecurity and ensuring everyone has access to nutritious food.', icon: <FaUtensils className="text-4xl text-primary" /> },
  { title: 'Education', description: 'Enhancing educational opportunities and resources for all learners.', icon: <FaGraduationCap className="text-4xl text-primary" /> },
];

const Home = () => {
  return (
    <div className='bg-gray-100 dark:bg-primary p-4'>
      <div className="flex w-full items-center md:flex-row h-screen">
        <div className="border-third border-4 ml-24">
          <img src="images/pic1.webp" className="w-[65rem] h-[35rem] p-2" alt="Home" />
        </div>
        <div className="flex flex-col w-full gap-2 rounded p-6">
          <p className="text-fivth font-bold text-xl md:text-2xl dark:text-primary bg-primary dark:bg-secondary p-6 w-[40rem]">
            END TO END SUITE : Volunteer Events Made Easy
          </p>
          <p className="text-base md:text-lg text-primary dark:text-secondary ml-[130px] text-justify">
            Say goodbye to clipboards, paper waivers and manual data entry. Manage your nonprofit’s volunteer program on one purpose-built platform. Explore VolunteerHub's roots, meet the minds behind our platform, and understand our unwavering commitment to transforming the volunteer management landscape.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center md:flex-row h-screen">
        <div className="flex flex-col w-full gap-8 rounded p-6 ml-24">
          <p className="text-fivth font-bold text-xl md:text-2xl dark:text-primary bg-primary dark:bg-secondary p-6 w-[40rem] ml-[7rem]">
            Helping Organizations Better Recruit, Engage, and Manage Volunteers
          </p>
          <p className="text-base md:text-lg text-primary dark:text-secondary mr-[10rem] text-justify">
            You need to make the most of your volunteers’ time and effort, and the time and effort you dedicate to managing them. We make it easy to not just manage your volunteers, but effectively engage them. VolunteerHub is a feature-rich, easy-to-use volunteer management software created to help organizations get the most value from their volunteer program by eliminating constraints.
          </p>
        </div>
        <div className="border-third border-4 mr-14">
          <img src="images/pic.webp" className="w-[85rem] h-[35rem] p-2" alt="Home" />
        </div>
      </div>
      <div className='my-12'>
        <ReviewCarousel />
      </div>

      {/* solution section */}
      <div className="use-cases-container py-12">
        <h2 className="text-3xl font-bold text-center mb-6 dark:text-fivth">Solutions Made Just for You</h2>
        <p className="text-center mb-8 dark:text-secondary">
          Explore our use cases to see how Civic Champs works for your cause.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="use-case-item p-6 bg-white rounded-lg shadow-md dark:bg-secondary">
              <div className="flex items-center mb-4">
                {useCase.icon}
                <h3 className="text-xl font-semibold ml-4 dark:text-primary">{useCase.title}</h3>
              </div>
              <p className="text-base text-primary dark:text-black">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="banner-container bg-[#f9efd8] text-black text-center py-8">
        <h1 className="text-3xl font-bold">
          Build a Better Volunteer Program - for You and Your Volunteers
        </h1>
        <p className='text-lg mt-2'>
          Our platform's key features, including Volunteer Management, Opportunity Management, and Volunteer Communication, are designed to make your processes more efficient, your opportunities more organized, and your communication with volunteers more effective. This way, you can put your energy into what truly matters: advancing your mission.
        </p>
      </div>
    </div>
  );
};

export default Home;
