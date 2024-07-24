import React from 'react'

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">A Fund Rising Event</h1>
        <p className="text-lg mb-8">
          Our most popular service is our Virtual Receptionist. We know that sometimes it's difficult to get to the phone if you are in the middle of something and you don't want to miss that important call that could be the start of an exciting new business opportunity, so let us answer it for you.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Learn More
        </button>
      </section>

      <section className="py-20 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-4">Stay Up to Date</h2>
        <form className="flex flex-col items-center">
          <input type="email" placeholder="Your Email" className="border border-gray-300 p-4 rounded w-full md:w-1/2" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Subscribe</button>
        </form>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Volunteer</h2>
        <p className="text-lg text-center mb-8">Help build a world where everyone has a decent place to live.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Involved
        </button>
      </section>
    </div>
  )
}

export default HeroSection

