import { useState, useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyCar = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate();

  // Fetch cars added by the user
  useEffect(() => {
    const fetchCars = async () => {
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
  }, [user.email]);

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

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center">My Cars</h1>

      <div className="mt-4 flex justify-between items-center">
        {/* Left Sorting: Date */}
        <div className="flex gap-2">
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

        {/* Right Sorting: Price */}
        <div className="flex gap-2">
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
                      onClick={() => openEditModal(car)}
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
    </div>
  );
};

export default MyCar;
