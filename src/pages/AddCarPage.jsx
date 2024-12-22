import React, { useContext, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const AddCarPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user}=useContext(AuthContext);


  const handleSubmit = async (e) => {
  e.preventDefault();

  const carData = {
    carModel: e.target.carModel.value,
    dailyRentalPrice: e.target.dailyRentalPrice.value,
    availability: e.target.availability.value,
    vehicleRegistrationNumber: e.target.vehicleRegistrationNumber.value,
    features: e.target.features.value,
    description: e.target.description.value,
    bookingCount: 0, // Default booking count
    location: e.target.location.value,
    images: uploadedFiles.map((file) => file.name),
    user: user.email, // Add the user's email from the AuthContext
    userName: user.displayName, // Add the user's display name
    dateAdded: new Date().toISOString(), // Add the current date
  };

  try {
    setLoading(true);
    await axios.post("http://localhost:5000/add-car", carData);
    Swal.fire({
      title: "Success!",
      text: "Car has been added successfully!",
      icon: "success",
      confirmButtonText: "OK",
    });
    navigate("/my-cars"); // Navigate to the /my-cars page after successful addition
    e.target.reset(); // Reset the form fields
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Failed to add car. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
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
              <Dropzone
                onDrop={(acceptedFiles) => setUploadedFiles(acceptedFiles)}
                accept="image/*"
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer"
                  >
                    <input {...getInputProps()} name="images" />
                    <p>Drag & drop files here, or click to select files</p>
                  </div>
                )}
              </Dropzone>
              {uploadedFiles.length > 0 && (
                <ul className="mt-2">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="text-sm">
                      {file.name}
                    </li>
                  ))}
                </ul>
              )}
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
