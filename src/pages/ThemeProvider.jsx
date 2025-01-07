import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing icons from react-icons
import AuthProvider from "../AuthProvider/AuthProvider";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <AuthProvider theme={theme}>
      <div>
        <button
          onClick={toggleTheme}
          className="btn btn-primary m-4 flex items-center justify-center"
        >
          {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
        {children}
      </div>
    </AuthProvider>
  );
};

export default ThemeProvider;
