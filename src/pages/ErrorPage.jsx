import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="error-content text-center">
        <img
          src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" // You can replace this URL with your own image or GIF
          alt="404 Error"
          className="w-72 h-72 mb-6"
        />
        <h1 className="text-4xl font-bold text-red-600">Oops! Page Not Found</h1>
        <p className="text-xl text-gray-600 my-4">The page you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary mt-4 py-2 px-6 rounded-lg text-white"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
