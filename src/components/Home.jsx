import React from 'react';
import Banner from '../pages/Banner';
import WhyChooseUs from '../pages/WhyChooseUs';
import RecentListings from '../pages/RecentListings';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <RecentListings></RecentListings>
        </div>
    );
};

export default Home;