import React from 'react';
import { FaCar, FaDollarSign, FaCheckCircle, FaHeadset } from 'react-icons/fa'; // Using react-icons for icons

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-100 mb-5 mt-5 rounded-xl">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <FaCar className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wide Variety of Cars</h3>
            <p className="text-gray-600">From budget-friendly options to luxury vehicles, we have something for everyone.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaDollarSign className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
            <p className="text-gray-600">Competitive daily rates you can count on for your next adventure.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-4xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Booking Process</h3>
            <p className="text-gray-600">Seamlessly book your ride in just a few clicks, hassle-free.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaHeadset className="text-4xl text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
            <p className="text-gray-600">24/7 assistance for all your queries, available anytime you need us.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
