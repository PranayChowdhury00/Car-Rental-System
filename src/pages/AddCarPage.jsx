import  { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const AddCarPage = () => {
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload images first and get their URLs
    

    const carData = {
      carModel: e.target.carModel.value,
      dailyRentalPrice: e.target.dailyRentalPrice.value,
      availability: e.target.availability.value,
      vehicleRegistrationNumber: e.target.vehicleRegistrationNumber.value,
      features: e.target.features.value,
      description: e.target.description.value,
      bookingCount: 0, // Default booking count
      location: e.target.location.value,
      imageUrl: e.target.imgUrl.value, // Use the URLs of the uploaded images
      user: user.email, // Add the user's email from the AuthContext
      userName: user.displayName, // Add the user's display name
      dateAdded: new Date().toISOString(), // Add the current date
    };

    try {
      const result = await axios.post("http://localhost:5000/add-car", carData);
     
     if(result.config.data){
      Swal.fire({
        title:'successfully inserted'
      })
      navigate('/my-cars')
     }

    } catch (error) {
      Swal.fire({
        title:'failed to send data'
      })
      
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="text-center mt-5 ">
            <h1 className="text-3xl font-bold">Add Car!</h1>
          </div>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Car Model</span>
              </label>
              <input
                type="text"
                name="carModel"
                placeholder="Car Model"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Daily Rental Price</span>
              </label>
              <input
                type="number"
                name="dailyRentalPrice"
                placeholder="Daily Rental Price"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Availability</span>
              </label>
              <select name="availability" className="select select-bordered">
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Vehicle Registration Number</span>
              </label>
              <input
                type="text"
                name="vehicleRegistrationNumber"
                placeholder="Vehicle Registration Number"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Features</span>
              </label>
              <input
                type="text"
                name="features"
                placeholder="e.g., GPS, AC, etc"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered"
                required
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Booking Count</span>
              </label>
              <input
                type="number"
                name="bookingCount"
                defaultValue={0}
                placeholder="Booking Count"
                className="input input-bordered"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Images</span>
              </label>
              <input type="url" name="imgUrl"  />
              
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCarPage;
