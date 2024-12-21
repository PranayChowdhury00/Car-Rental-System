import Lottie from "lottie-react";
import loginImg from "/public/login.json";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { RiFacebookCircleFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import swal from 'sweetalert';
const Login = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        if(result.user){
            swal({
                title: "Registration Successful!",
                icon: "success",
                
              })
              e.target.reset();
              navigate('/')
            }
      })
      .catch(error=>{
        console.log(error.message);
        swal({
            title: "Registration Failed",
            text: error.message,
            icon: "error",
            
        });
        e.target.reset();
    })
  };
  const googleLogin = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        {/* Lottie Animation */}
        <div className="flex-shrink-0">
          <Lottie
            animationData={loginImg}
            loop={true}
            className="w-full max-w-md"
          />
        </div>

        {/* Login Form */}
        <div className="card bg-white w-full max-w-md shadow-2xl rounded-lg">
          <form onSubmit={handelLogin} className="card-body p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
              Login Now!
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered border-gray-300"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered border-gray-300"
                required
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-blue-600"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-transform">
                Login
              </button>
            </div>
          </form>

          {/* Social Login */}
          <div className="text-center mb-6 px-6">
            <p className="text-xl font-medium text-gray-700">Or login with</p>
            <div className="flex gap-5 justify-center mt-4">
              {/* Facebook */}
              <div
                className="flex items-center cursor-pointer hover:scale-105 transition-transform"
                title="Login with Facebook"
              >
                <div className="bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center">
                  <RiFacebookCircleFill className="text-white text-lg" />
                </div>
                <p className="ml-2 text-gray-700 font-medium">Facebook</p>
              </div>

              {/* Google */}
              <div
                className="flex items-center cursor-pointer hover:scale-105 transition-transform"
                title="Login with Google"
              >
                <div className="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center">
                  <FaGoogle className="text-white text-lg" />
                </div>
                <button
                  onClick={googleLogin}
                  className="ml-2 text-gray-700 font-medium"
                >
                  Google
                </button>
              </div>

              {/* LinkedIn */}
              <div
                className="flex items-center cursor-pointer hover:scale-105 transition-transform"
                title="Login with LinkedIn"
              >
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                  <FaLinkedin className="text-white text-lg" />
                </div>
                <p className="ml-2 text-gray-700 font-medium">LinkedIn</p>
              </div>
            </div>

            <Link
              to="/register"
              className="mt-5 text-indigo-600 font-bold hover:underline cursor-pointer"
            >
              Register new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
