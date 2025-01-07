import React, { useContext } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "/public/logo00.webp";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Footer = () => {
  const { theme } = useContext(AuthContext);
  const isLightTheme = theme === "light";

  return (
    <footer
      className={`py-10 ${
        isLightTheme ? "bg-white text-black border-gray-300" : "bg-gray-900 text-gray-300"
      }`}
    >
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          {/* Logo and About */}
          <div className="mb-8 lg:mb-0 lg:w-1/3">
            <img
              src={logo}
              alt="Logo"
              className="w-16 h-16 mb-4"
              loading="lazy"
            />
            <h1 className={`text-2xl font-bold ${isLightTheme ? "text-black" : "text-white"}`}>
              Flexi-Drive
            </h1>
            <p className={`mt-2 text-sm ${isLightTheme ? "text-gray-600" : "text-gray-400"}`}>
              Your trusted car rental service for all your travel needs. Safe, affordable, and convenient.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mb-8 lg:mb-0 lg:w-1/3 flex flex-col lg:flex-row justify-between">
            {["Quick Links", "Policies"].map((section, idx) => (
              <div key={idx}>
                <h2 className={`text-lg font-semibold ${isLightTheme ? "text-black" : "text-white"} mb-4`}>
                  {section}
                </h2>
                <ul>
                  {section === "Quick Links" ? (
                    ["About Us", "Services", "Contact Us", "FAQs"].map((link, idx) => (
                      <li key={idx} className="mb-2">
                        <a href={`/${link.toLowerCase().replace(" ", "")}`} className="hover:underline">
                          {link}
                        </a>
                      </li>
                    ))
                  ) : (
                    ["Privacy Policy", "Terms & Conditions", "Refund Policy"].map((link, idx) => (
                      <li key={idx} className="mb-2">
                        <a href={`/${link.toLowerCase().replace(" ", "")}`} className="hover:underline">
                          {link}
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:w-1/3">
            <h2 className={`text-lg font-semibold ${isLightTheme ? "text-black" : "text-white"} mb-4`}>
              Subscribe to our Newsletter
            </h2>
            <p className={`text-sm ${isLightTheme ? "text-gray-600" : "text-gray-400"} mb-4`}>
              Stay updated with our latest offers and services.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring ${
                  isLightTheme
                    ? "border-gray-300 focus:ring-gray-200"
                    : "border-gray-700 focus:ring-gray-800"
                }`}
                aria-label="Email Address"
              />
              <button
                className={`px-4 py-2 font-semibold rounded-r-lg ${
                  isLightTheme ? "bg-black text-white hover:bg-gray-800" : "bg-gray-800 text-white hover:bg-black"
                }`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <hr className="my-6" />
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <p className={`text-sm ${isLightTheme ? "text-gray-600" : "text-gray-400"}`}>
            © {new Date().getFullYear()} Flexi-Drive. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 lg:mt-0">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className={`hover:text-${isLightTheme ? "black" : "white"}`}
                aria-label={`Visit our ${Icon.name} page`}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
