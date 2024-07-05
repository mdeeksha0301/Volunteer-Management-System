import React from 'react';
import ReviewCarousel from '../../components/ReviewCarousel';

const useCases = [
  { title: 'Housing', description: 'Read More' },
  { title: 'Animal Welfare', description: 'Read More' },
  { title: 'Hunger Relief', description: 'Read More' },
  { title: 'Education', description: 'Read More' },
];

const Home = () => {
  return (
    <div className='bg-gray-100 dark:bg-primary p-4'>
      <div className="flex w-full items-center md:flex-row  h-screen ">
        <div className="border-third border-4 ml-24">
          <img src="images/Home_Image.png" className="w-[45rem] h-[35rem] p-2 " alt="Home" />
        </div>
        <div className="flex flex-col w-full gap-8   rounded p-6  ">
          <p className="text-fivth font-bold text-xl md:text-2xl dark:text-primary bg-primary dark:bg-secondary p-6 w-[40rem]">
            Each Donation is essential help for everybody's life
          </p>
          <p className="text-base md:text-lg  text-primary dark:text-secondary  ml-[130px] text-justify ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo perferendis dignissimos eligendi voluptas exercitationem, eius aut mollitia quasi nisi voluptatem similique, tempore totam, odit repellendus non. Dolores eos animi recusandae.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center md:flex-row  h-screen ">
       
        <div className="flex flex-col w-full gap-8 rounded p-6 ml-24 ">
          <p className="text-fivth font-bold text-xl md:text-2xl dark:text-primary bg-primary dark:bg-secondary p-6 w-[40rem] ml-[7rem]">
            Each Donation is essential help for everybody's life
          </p>
          <p className="text-base md:text-lg  text-primary dark:text-secondary  mr-[10rem] text-justify ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo perferendis dignissimos eligendi voluptas exercitationem, eius aut mollitia quasi nisi voluptatem similique, tempore totam, odit repellendus non. Dolores eos animi recusandae.
          </p>
        </div>
        <div className="border-third border-4 mr-24">
          <img src="images/Home_Image.png" className="w-[45rem] h-[35rem] p-2 " alt="Home" />
        </div>
      </div>
      <div className='my-12'>
        <ReviewCarousel />
      </div>
      <div className="use-cases-container py-12">
        <h2 className="text-3xl font-bold text-center mb-6 dark:text-fivth">Solutions Made Just for You</h2>
        <p className="text-center mb-8 dark:text-secondary">
          Explore our use cases to see how Civic Champs works for your cause.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="use-case-item p-6 bg-white rounded-lg shadow-md dark:bg-secondary">
              <h3 className="text-xl font-semibold mb-4 dark:text-fivth">{useCase.title}</h3>
              <button className="text-blue-500 font-medium hover:underline">{useCase.description}</button>
            </div>
          ))}
        </div>
      </div>
      <div className="banner-container bg-[#f9efd8] text-black text-center py-8">
        <h1 className="text-3xl font-bold">
          Build a Better Volunteer Program - for You and Your Volunteers
        </h1>
      </div>
    </div>
  );
};

export default Home;
