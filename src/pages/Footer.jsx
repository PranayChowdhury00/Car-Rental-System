import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '/public/logo00.webp'
const Footer = () => {
  return (
    <div className="footer bg-gray-800 text-white py-10 ">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6">
        {/* Logo and Website Name */}
        <div className="flex items-center mb-6 lg:mb-0">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 mr-3"
          />
          <h1 className="text-2xl font-bold text-gray-100">Flexi-Drive</h1>
        </div>

        {/* Copyright Info */}
        <p className="text-sm text-gray-400">© 2024 Flexi-Drive. All rights reserved.</p>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-4 lg:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
