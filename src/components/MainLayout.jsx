import React from 'react';
import NavBar from '../pages/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;