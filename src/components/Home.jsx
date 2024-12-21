import React from 'react';
import Banner from '../pages/Banner';
import WhyChooseUs from '../pages/WhyChooseUs';
import RecentListings from '../pages/RecentListings';
import Testimonials from '../pages/Testimonials';
import SpecialOffers from '../pages/SpecialOffers';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <RecentListings></RecentListings>
            <Testimonials></Testimonials>
            <SpecialOffers></SpecialOffers>
        </div>
    );
};

export default Home;