import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyCar = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [selectCar, setSelectCar] = useState(null); // Use this state for selected car
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  // Fetch cars added by the user
  useEffect(() => {
    const fetchCars = async () => {
      if (!user?.email) return; // Don't fetch if user email is not available

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/myCar/${user.email}`
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [user?.email]);

  // Handle sorting logic
  const handleSort = (option) => {
    setSortBy(option);
    let sortedCars = [...cars];
    if (option === "Newest First") {
      sortedCars.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (option === "Oldest First") {
      sortedCars.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    } else if (option === "Lowest First") {
      sortedCars.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
    } else if (option === "Highest First") {
      sortedCars.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
    }
    setCars(sortedCars);
  };

  // Handle car deletion
  const handleDelete = async (carId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This car will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/delete-car/${carId}`);
        setCars(cars.filter((car) => car._id !== carId));
        Swal.fire("Deleted!", "The car has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      Swal.fire("Error!", "There was an issue deleting the car.", "error");
    }
  };

  const openModal = (car) => {
    setSelectCar(car);  // Set the selected car
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (!user?.email) {
    return (
      <div className="mt-6 text-center">
        <p className="text-lg">You need to log in to view your cars.</p>
        <a href="/login" className="text-blue-500 underline">
          Login
        </a>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const updatedCarData = {
      carModel: e.target.carModel.value,
      dailyRentalPrice: e.target.dailyRentalPrice.value,
      availability: e.target.availability.value,
      vehicleRegistrationNumber: e.target.vehicleRegistrationNumber.value,
      features: e.target.features.value,
      description: e.target.description.value,
      location: e.target.location.value,
      imageUrl: e.target.imgUrl.value,
    };
  
    try {
      const response = await axios.put(
        `http://localhost:5000/update-car/${selectCar._id}`,
        updatedCarData
      );
  
      if (response.data) {
        // Update the cars state
        setCars((prevCars) =>
          prevCars.map((car) =>
            car._id === selectCar._id ? { ...car, ...updatedCarData } : car
          )
        );
  
        // Show success message
        Swal.fire({
          title: "Car updated successfully!",
          icon: "success",
        });
  
        // Close the modal
        closeModal();
      }
    } catch (error) {
      console.error("Error updating car:", error);
      Swal.fire({
        title: "Failed to update car",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center">My Cars</h1>

      <div className="mt-4 flex justify-between items-center">
        {/* Left Sorting: Date */}
        <div className="flex gap-2">
          <button
            className={`btn ${
              sortBy === "Newest First" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleSort("Newest First")}
          >
            Newest First
          </button>
          <button
            className={`btn ${
              sortBy === "Oldest First" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleSort("Oldest First")}
          >
            Oldest First
          </button>
        </div>

        {/* Right Sorting: Price */}
        <div className="flex gap-2">
          <button
            className={`btn ${
              sortBy === "Lowest First" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleSort("Lowest First")}
          >
            Lowest First
          </button>
          <button
            className={`btn ${
              sortBy === "Highest First" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleSort("Highest First")}
          >
            Highest First
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : cars.length === 0 ? (
        <div className="mt-6 text-center">
          <p className="text-lg">
            No cars added yet.{" "}
            <a href="/add-car" className="text-blue-500 underline">
              Click here to add a car.
            </a>
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Car Model</th>
                <th>Daily Rental Price</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id}>
                  <td>
                    <img
                      src={car.imageUrl}
                      alt={car.carModel}
                      className="w-20 h-20"
                    />
                  </td>
                  <td>{car.carModel}</td>
                  <td>{car.dailyRentalPrice}</td>
                  <td>{car.availability}</td>
                  <td>
                    <button
                      className="btn btn-warning mr-2"
                      onClick={() => openModal(car)} // Open modal with car details
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(car._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Updating Car */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">Update Car</h3>
           
            <div className="modal-action">
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
                defaultValue={selectCar.carModel}
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
                defaultValue={selectCar.dailyRentalPrice}
                
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Availability</span>
              </label>
              <select name="availability"   defaultValue={selectCar.availability} className="select select-bordered">
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
                defaultValue={selectCar.vehicleRegistrationNumber}
                
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
                defaultValue={selectCar.features}
                
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
                defaultValue={selectCar.description}
                
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
                defaultValue={selectCar.location}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Images</span>
              </label>
              <input className="border-2 py-2 px-2 rounded-lg" type="url" name="imgUrl" placeholder="imgUrl" defaultValue={selectCar.imgUrl}/>
              
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
              <button className="btn" onClick={closeModal}>Close</button>
          </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCar;
