import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const testimonialsData = [
  {
    name: "John Doe",
    image: "https://i.ibb.co/jTSkBdF/boy1.jpg",
    rating: 5,
    text: "Amazing service and great cars. Highly recommend!",
  },
  {
    name: "Jane Smith",
    image: "https://i.ibb.co/T44GH80/boy2.jpg",
    rating: 4,
    text: "The cars were clean and well-maintained. Very happy with my experience.",
  },
  {
    name: "lois griffin",
    image: "https://i.ibb.co.com/YZdW7Db/girl.jpg",
    rating: 5,
    text: "Best car rental experience I've had! Friendly staff and great cars.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">User Testimonials</h2>
        <div className="relative w-full">
         
          <button
            onClick={() =>
              setCurrentIndex(
                (prevIndex) => (prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1)
              )
            }
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl text-gray-600 hover:text-gray-800"
          >
            &#10094;
          </button>

          
          <button
            onClick={() =>
              setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length)
            }
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl text-gray-600 hover:text-gray-800"
          >
            &#10095;
          </button>

          
          <div className="overflow-hidden rounded-xl shadow-xl">
            <div className="transition-opacity duration-1000 ease-in-out opacity-100">
              <div className="flex justify-center items-center space-x-8">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                  <img
                    src={testimonialsData[currentIndex].image}
                    alt={testimonialsData[currentIndex].name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{testimonialsData[currentIndex].name}</h3>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(testimonialsData[currentIndex].rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-center text-gray-700">{testimonialsData[currentIndex].text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
