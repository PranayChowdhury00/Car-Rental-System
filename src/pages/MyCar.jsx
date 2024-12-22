import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyCar = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cars from the backend when the component mounts
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/myCar/${user?.email}`
        );
        setCars(response.data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchCars();
    }
  }, [user?.email]);

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`http://localhost:5000/delete-car/${carId}`);
      setCars(cars.filter(car => car._id !== carId)); 
      alert("Car deleted successfully");
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("Failed to delete car");
    }
  };

//   const handleUpdate = (carId) => {
//     // You can implement an update form or redirect to an update page here
//     alert(`Update car with ID: ${carId}`);
//   };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">My Cars</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Car Image</th>
              <th>Car Model</th>
              <th>Daily Rental Price</th>
              <th>Availability</th>
              <th>Date Added</th>
              <th>Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No cars found.</td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr key={car._id}>
                  <td>
                    <img
                      src={`http://localhost:5000/images/${car.images[0]}`}
                      alt={car.carModel}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td>{car.carModel}</td>
                  <td>${car.dailyRentalPrice}</td>
                  <td>{car.availability}</td>
                  <td>{new Date(car.dateAdded).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(car._id)}
                      className="btn btn-sm btn-primary mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCar;
