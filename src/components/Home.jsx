import React from 'react';
import Banner from '../pages/Banner';
import WhyChooseUs from '../pages/WhyChooseUs';
import RecentListings from '../pages/RecentListings';
import Testimonials from '../pages/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <RecentListings></RecentListings>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;