import React, { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom";

const AddCarForm = () => {
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState({
    model: "",
    dailyRentalPrice: "",
    availability: true,
    registrationNumber: "",
    features: "",
    description: "",
    location: "",
  });
  const [images, setImages] = useState([]);
  const { user } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState({
    name: user.displayName,
    email: user.email,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setImages(acceptedFiles);
    },
    accept: "image/*",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((file) => formData.append("images", file));
    formData.append("carDetails", JSON.stringify(carDetails));
    formData.append("userDetails", JSON.stringify(userDetails));
    formData.append("date", new Date().toISOString());
    formData.append("bookingCount", 0);
    formData.append("bookingStatus", "Available");

    try {
      const response = await axios.post("http://localhost:5000/add-car", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Car Added Successfully!",
        text: "Your car has been added .",
      }).then(() => {
        
        navigate("/my-cars");
      });
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Car",
        text: "There was an error adding the car. Please try again.",
      });
      console.error("Error adding car:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-lg shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Add a Car</h1>

      <div>
        <label className="block font-semibold">Car Model</label>
        <input
          type="text"
          name="model"
          value={carDetails.model}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Daily Rental Price</label>
        <input
          type="number"
          name="dailyRentalPrice"
          value={carDetails.dailyRentalPrice}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Vehicle Registration Number</label>
        <input
          type="text"
          name="registrationNumber"
          value={carDetails.registrationNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Features</label>
        <input
          type="text"
          name="features"
          value={carDetails.features}
          onChange={handleChange}
          placeholder="E.g., GPS, AC"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          value={carDetails.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
      </div>

      <div>
        <label className="block font-semibold">Location</label>
        <input
          type="text"
          name="location"
          value={carDetails.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div {...getRootProps()} className="border-2 border-dashed p-4 rounded">
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the images here...</p> : <p>Drag & drop images, or click to select</p>}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={`Preview ${index + 1}`}
            className="w-full h-24 object-cover rounded-md"
          />
        ))}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Car
      </button>
    </form>
  );
};

export default AddCarForm;
