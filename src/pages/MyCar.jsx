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
  const [selectCar, setSelectCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch cars added by the user
  useEffect(() => {
    const fetchCars = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/myCar/${user.email}`, {
          withCredentials: true
        });
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
    setSelectCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      const response = await axios.patch(
        `http://localhost:5000/update-car/${selectCar._id}`,
        updatedCarData
      );

      if (response.data) {
        setCars((prevCars) =>
          prevCars.map((car) =>
            car._id === selectCar._id ? { ...car, ...updatedCarData } : car
          )
        );

        Swal.fire({
          title: "Car updated successfully!",
          icon: "success",
        });

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">My Cars</h1>

      <div className="mt-6 flex justify-between">
        {/* Sorting Buttons */}
        <div className="flex gap-2 flex-col md:flex-row">
          <button
            className={`btn ${sortBy === "Newest First" ? "btn-primary" : "btn-outline"}`}
            onClick={() => handleSort("Newest First")}
          >
            Newest First
          </button>
          <button
            className={`btn ${sortBy === "Oldest First" ? "btn-primary" : "btn-outline"}`}
            onClick={() => handleSort("Oldest First")}
          >
            Oldest First
          </button>
          </div>
         <div className="flex gap-3 flex-col md:flex-row">
          <button
            className={`btn ${sortBy === "Lowest First" ? "btn-primary" : "btn-outline"}`}
            onClick={() => handleSort("Lowest First")}
          >
            Lowest First
          </button>
          <button
            className={`btn ${sortBy === "Highest First" ? "btn-primary" : "btn-outline"}`}
            onClick={() => handleSort("Highest First")}
          >
            Highest First
          </button>
        </div>
      </div>

      {loading ? (
        <p className="mt-6 text-center text-lg">Loading...</p>
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
          <table className="table table-zebra w-full text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
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
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td>{car.carModel}</td>
                  <td>${car.dailyRentalPrice}</td>
                  <td>{car.availability}</td>
                  <td className="flex space-x-2">
                    <button
                      className="btn bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200 rounded-lg px-4 py-2"
                      onClick={() => openModal(car)}
                    >
                      Update
                    </button>
                    <button
                      className="btn bg-red-500 text-white hover:bg-red-600 transition duration-200 rounded-lg px-4 py-2"
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
          <div className="modal-box w-full max-w-3xl">
            <h3 className="text-lg font-semibold text-gray-800">Update Car</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Add Input Fields Here */}
              </div>
              <div className="modal-action">
                <button className="btn bg-blue-500 text-white hover:bg-blue-600 transition duration-200 rounded-lg px-4 py-2">
                  Update Car
                </button>
                <button type="button" className="btn bg-gray-400 text-white hover:bg-gray-500 transition duration-200 rounded-lg px-4 py-2" onClick={closeModal}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCar;
