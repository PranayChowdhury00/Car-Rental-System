import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import swal from 'sweetalert';

const NavBar = () => {
  const { signOutUser, user } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/available-car">Available Cars</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-car">Add Car</NavLink>
          </li>
          <li>
            <NavLink to="/my-cars">My Cars</NavLink>
          </li>
          <li>
            <NavLink to="/my-bookings">My Bookings</NavLink>
          </li>
        </>
      )}
    </>
  );

  const signOut = () => {
    signOutUser()
      .then(() => {
        swal({
          title: "Logout Successful!",
          icon: "success",
        });
      })
      .catch((error) => {
        swal({
          title: "Signout Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Flexi-Drive</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={signOut} className="btn btn-ghost">
            Log-out
          </button>
        ) : (
          <Link to="/login" className="btn btn-ghost">
            Log-in
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
