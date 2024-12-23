import Lottie from "lottie-react";
import registerImg from "../../public/login.json"; 
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { RiFacebookCircleFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import swal from 'sweetalert';

const Register = () => {
    const {createNewUser}=useContext(AuthContext);
    const navigate = useNavigate();
    const handelRegister = e=>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const url = e.target.url.value;
        console.log(name,email,password,url);
        createNewUser(email,password)
        .then(res=>{
            console.log(res.user)
           if(res.user){
            swal({
                title: "Registration Successful!",
                icon: "success",
                
              })
              e.target.reset();
              navigate('/');
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


    }

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        {/* Lottie Animation */}
        <div className="flex-shrink-0">
          <Lottie animationData={registerImg} loop={true} className="w-full max-w-md" />
        </div>

        {/* Register Form */}
        <div className="card bg-white w-full max-w-md shadow-2xl rounded-lg">
          <form onSubmit={handelRegister} className="card-body p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Register Now!</h1>

            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Name</span>
              </label>
              <input
              name="name"
                type="text"
                placeholder="Enter your name"
                className="input input-bordered border-gray-300"
                required
              />
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Password</span>
              </label>
              <input
              name="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered border-gray-300"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Photo URL</span>
              </label>
              <input
              name="url"
                type="url"
                placeholder="Enter your photo URL"
                className="input input-bordered border-gray-300"
              />
            </div>

            {/* Register Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-transform">
                Register
              </button>
            </div>
          </form>

          {/* Social Login */}
          <div className="text-center mb-6 px-6">
            <p className="text-xl font-medium text-gray-700">Or register with</p>
            <div className="flex gap-5 justify-center mt-4">
              {/* Facebook */}
              <div
                className="flex items-center cursor-pointer hover:scale-105 transition-transform"
                title="Register with Facebook"
              >
                <div className="bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center">
                  <RiFacebookCircleFill className="text-white text-lg" />
                </div>
                <p className="ml-2 text-gray-700 font-medium">Facebook</p>
              </div>

              {/* Google */}
              <div
                className="flex items-center cursor-pointer hover:scale-105 transition-transform"
                title="Register with Google"
              >
                <div className="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center">
                  <FaGoogle className="text-white text-lg" />
                </div>
                <p className="ml-2 text-gray-700 font-medium">Google</p>
              </div>

              {/* LinkedIn */}
              <div
                className="flex items-center cursor-pointer hover:scale-105 transition-transform"
                title="Register with LinkedIn"
              >
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                  <FaLinkedin className="text-white text-lg" />
                </div>
                <p className="ml-2 text-gray-700 font-medium">LinkedIn</p>
              </div>
            </div>

            <Link to='/login' className="mt-5 text-indigo-600 font-bold hover:underline cursor-pointer">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
