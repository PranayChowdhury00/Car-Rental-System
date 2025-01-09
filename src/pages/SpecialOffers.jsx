import React from "react";
import { motion } from "framer-motion";

const offers = [
  {
    title: "Get 15% off for weekend rentals!",
    description: "Book a car this weekend and enjoy 15% off. Limited time offer.",
    buttonText: "Book Now",
    link: "#",
  },
  {
    title: "Luxury cars at $99/day this holiday season!",
    description: "Drive in style with our luxury cars for just $99 per day this holiday season.",
    buttonText: "Book Now",
    link: "#",
  },
  {
    title: "Free GPS with every rental this month!",
    description: "For the whole month, get free GPS with every car rental. Book now!",
    buttonText: "Book Now",
    link: "#",
  },
];

const SpecialOffers = () => {
  return (
    <section className="py-16 bg-base-200 mb-5 rounded-xl mt-5">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 leading-tight">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              className="flex flex-col p-6 bg-white rounded-3xl shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl"
              whileHover={{ scale: 1.05 }} // Slight bounce effect
              initial={{ opacity: 0, y: 50 }} // Slide-in effect from below
              animate={{ opacity: 1, y: 0 }} // Final position after animation
              transition={{ duration: 0.6, delay: index * 0.2 }} // Sequential animation
            >
              <div className="relative mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{offer.title}</h3>
                <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-bold">
                  {offer.buttonText}
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">{offer.description}</p>
              <a
                href={offer.link}
                className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 px-8 rounded-lg text-center transform transition-all hover:translate-y-1 shadow-md hover:shadow-lg"
                aria-label={offer.buttonText}
              >
                {offer.buttonText}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
