import React from 'react';
import bannerImg from '/public/car.webp'; 

const Banner = () => {
  return (
    <section
      className="relative w-full h-96 bg-cover bg-center mt-5 mb-5 rounded-xl"
      style={{ backgroundImage: `url(${bannerImg})` }} 
    >
      <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div> 
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-shadow-lg">Drive Your Dreams Today!</h1>
        <a href="/available-car" className="btn btn-primary text-xl">View Available Cars</a>
      </div>
    </section>
  );
};

export default Banner;
