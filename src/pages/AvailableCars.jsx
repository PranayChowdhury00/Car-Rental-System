import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("newest"); // 'newest' or 'price'
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Filter cars based on search term
  const filteredCars = cars.filter(
    (car) =>
      car.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort cars based on selected sorting option
  const sortedCars = filteredCars.sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.dateAdded) - new Date(a.dateAdded); // Newest first
    }
    if (sortBy === "oldest") {
      return new Date(a.dateAdded) - new Date(b.dateAdded); // Oldest first
    }
    if (sortBy === "priceLow") {
      return a.dailyRentalPrice - b.dailyRentalPrice; // Lowest price first
    }
    if (sortBy === "priceHigh") {
      return b.dailyRentalPrice - a.dailyRentalPrice; // Highest price first
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
      <h1 className="text-3xl font-bold text-center">Available Cars</h1>

      <div className="mt-4 flex justify-between items-center">
        <input
          type="text"
          className="input input-bordered"
          placeholder="Search by model, brand, or location"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="flex items-center space-x-4">
          <button onClick={handleViewModeToggle} className="btn btn-primary">
            Toggle {viewMode === "grid" ? "List" : "Grid"} View
          </button>
          <select
            className="select select-bordered"
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
        <p>Loading...</p>
      ) : sortedCars.length === 0 ? (
        <div className="mt-6 text-center">
          <p>No available cars found.</p>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-3 gap-6" : "space-y-6"}>
          {sortedCars.map((car) => (
            <div
              key={car._id}
              className={viewMode === "grid" ? "card" : "card list-view"}
            >
              <img src={car.imageUrl} alt={car.carModel} className="w-full h-40 object-cover" />
              <div className="card-body">
                <h3 className="text-xl font-semibold">{car.carModel}</h3>
                <p>{car.location}</p>
                <p className="text-lg font-bold">{car.dailyRentalPrice} BDT</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/car-details/${car._id}`)}
                    className="btn btn-primary"
                  >
                    Book Now
                  </button>
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
