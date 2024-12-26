import { useContext, useState } from "react";
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

    const featuresInput = e.target.features.value;
    const featuresArray = featuresInput.split(",").map((feature) => feature.trim());

    const carData = {
      carModel: e.target.carModel.value,
      dailyRentalPrice: e.target.dailyRentalPrice.value,
      availability: e.target.availability.value,
      vehicleRegistrationNumber: e.target.vehicleRegistrationNumber.value,
      features: featuresArray,
      description: e.target.description.value,
      bookingCount: 0,
      location: e.target.location.value,
      imageUrl: e.target.imgUrl.value,
      user: user.email,
      userName: user.displayName,
      dateAdded: new Date().toISOString(),
      bookingStatus: "pending",
    };

    try {
      const result = await axios.post("https://carrent-eight.vercel.app/add-car", carData);
      if (result.config.data) {
        Swal.fire({ title: "Successfully inserted!" });
        navigate("/my-cars");
      }
    } catch (error) {
      Swal.fire({ title: "Failed to send data!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Add Your Car
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Car Model</span>
              </label>
              <input
                type="text"
                name="carModel"
                placeholder="e.g., Toyota Corolla"
                className="input input-bordered w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Daily Rental Price</span>
              </label>
              <input
                type="number"
                name="dailyRentalPrice"
                placeholder="e.g., 50"
                className="input input-bordered w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Availability</span>
              </label>
              <select
                name="availability"
                className="select select-bordered w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Vehicle Registration Number
                </span>
              </label>
              <input
                type="text"
                name="vehicleRegistrationNumber"
                placeholder="e.g., ABC-1234"
                className="input input-bordered w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          </div>
          {/* Features */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Features</span>
            </label>
            <input
              type="text"
              name="features"
              placeholder="e.g., GPS, AC, Sunroof"
              className="input input-bordered w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          {/* Description */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Brief description of the car"
              className="textarea textarea-bordered w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            ></textarea>
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g., New York"
                className="input input-bordered w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Image URL</span>
              </label>
              <input
                type="url"
                name="imgUrl"
                placeholder="Paste the image URL here"
                className="input input-bordered w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              className={`btn bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold hover:from-pink-500 hover:to-indigo-500 transition-all rounded-lg w-full ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarPage;
