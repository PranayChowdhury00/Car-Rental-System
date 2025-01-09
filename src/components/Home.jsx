import React from 'react';
import Banner from '../pages/Banner';
import WhyChooseUs from '../pages/WhyChooseUs';
import RecentListings from '../pages/RecentListings';
import Testimonials from '../pages/Testimonials';
import SpecialOffers from '../pages/SpecialOffers';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import LocationMap from '../pages/LocationMap';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <WhyChooseUs></WhyChooseUs>
            <RecentListings></RecentListings>
            <Testimonials></Testimonials>
            <SpecialOffers></SpecialOffers>
            <LocationMap></LocationMap>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;