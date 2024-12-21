import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';


const PrivateRoute = ({ children }) => {
    const { user,loader } = useContext(AuthContext); 

    if (loader) {
        return (
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        );
      }
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
