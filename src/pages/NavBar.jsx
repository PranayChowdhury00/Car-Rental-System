import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import swal from "sweetalert";
import ThemeProvider from "./ThemeProvider";

const NavBar = () => {
  const { signOutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
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
          timer: 2000,
          buttons: false,
        });
        navigate("/");
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
    <div className="bg-base-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto navbar ">
        {/* Navbar Start */}
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
        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        {/* Navbar End */}
        <div className="navbar-end">
          <ThemeProvider />
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
    </div>
  );
};

export default NavBar;
