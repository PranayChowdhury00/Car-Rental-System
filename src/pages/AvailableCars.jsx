import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const AvailableCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error on retry
        const response = await axios.get("http://localhost:5000/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Failed to load cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      car.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCars = filteredCars.sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
    if (sortBy === "oldest") {
      return new Date(a.dateAdded) - new Date(b.dateAdded);
    }
    if (sortBy === "priceLow") {
      return a.dailyRentalPrice - b.dailyRentalPrice;
    }
    if (sortBy === "priceHigh") {
      return b.dailyRentalPrice - a.dailyRentalPrice;
    }
    return 0;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleViewModeToggle = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl md:text-3xl font-bold text-center">Available Cars</h1>

      <div className="mt-4 py-5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <input
          type="text"
          className="input input-bordered w-full md:w-1/2"
          placeholder="Search by model, brand, or location"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <button onClick={handleViewModeToggle} className="btn btn-primary w-full md:w-auto">
            Toggle {viewMode === "grid" ? "List" : "Grid"} View
          </button>
          <select
            className="select select-bordered w-full md:w-auto"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priceLow">Price: Lowest First</option>
            <option value="priceHigh">Price: Highest First</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <div className="mt-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : sortedCars.length === 0 ? (
        <div className="mt-6 text-center">
          <p>No available cars found.</p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {sortedCars.map((car) => (
            <div
              key={car._id}
              className="card card-compact bg-base-100 shadow-md"
            >
              <figure>
                <img
                  src={car.imageUrl}
                  alt={car.carModel}
                  className="w-full h-48 sm:h-60 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-lg md:text-xl font-semibold">{car.carModel}</h3>
                <p className="text-sm md:text-base">{car.location}</p>
                <p className="text-lg font-bold">{car.dailyRentalPrice} BDT</p>
                <div className="card-actions justify-end">
                  {car?.user === user?.email ? (
                    <button
                      disabled
                      onClick={() => navigate(`/car-details/${car._id}`)}
                      className="btn btn-primary"
                    >
                      Book Now
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/car-details/${car._id}`)}
                      className="btn btn-primary"
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
