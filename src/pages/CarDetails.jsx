import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../AuthProvider/AuthProvider";

const CarDetails = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date()); 
  const {user}=useContext(AuthContext);
   const [availability,setAvailability]=useState(true);
  
  
  useEffect(() => {
    axios
      .get(`https://carrent-eight.vercel.app/cars/${id}`)
      .then((response) => setCarData(response.data))
      .catch((error) => console.error("Error fetching car details:", error));
  }, [id]);

  
  const handleBooking = () => {
    if (carData.bookingCount > 0  ) {
      Swal.fire({
        title: "Already Booked",
        icon: "warning",
      });
    } else {
      const data = {
        carId: carData._id,
        carModel: carData.carModel,
        imageUrl: carData.imageUrl,
        dailyRentalPrice: carData.dailyRentalPrice,
        startDate,
        endDate,
        userEmail: user?.email, 
        bookingStatus: "confirm", 
      };
  
      axios
        .post('https://carrent-eight.vercel.app/bookings', data)
        .then((response) => {
          if (response.data.success) {

            setCarData((prevData) => ({
              ...prevData,
              bookingCount: prevData.bookingCount + 1,
            }));

            axios.patch(`https://carrent-eight.vercel.app/counting-booking/${id}`);
            Swal.fire({
              title: "Car Rent Successfully ",
              icon: "success",
            });
            setIsModalOpen(false);
          }
        })
        .catch((error) => {
          console.error("Error booking the car:", error);
        });
    }
  };
  
  useEffect(() => {
    if (carData?.bookingStatus === "pending" || carData?.bookingStatus === "cancelled") {
      setAvailability(true); 
      
    } else {
      setAvailability(false); 
    }
  }, [carData]);
  

 
  const handleDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(date);
    } else if (type === "end") {
      setEndDate(date);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
      <div className="max-w-4xl w-full bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
        
          <div className="relative">
            <img
              src={carData.imageUrl || "https://via.placeholder.com/500"}
              alt={carData.carModel || "Car"}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
          </div>

          
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{carData.carModel || "Car Model"}</h1>
              <p className="text-lg text-gray-400 mb-4">{carData.description || "Description not available."}</p>
              <div className="text-lg space-y-2">
                <p><span className="font-semibold">Daily Rental Price:</span> ${carData.dailyRentalPrice || "N/A"}</p>
                <p><span className="font-semibold">Availability:</span> {carData.availability || "Unknown"}</p>
                <p><span className="font-semibold">BookingCount:</span> {carData.bookingCount || 0}</p>
                <p className="font-semibold">Features:</p>
                <ul className="list-disc list-inside pl-4">
                  {carData?.features && carData?.features?.length > 0 ? (
                    carData.features.map((feature, index) => (
                      <li key={index} className="text-gray-400">{feature}</li>
                    ))
                  ) : (
                    <li className="text-gray-400">No features listed.</li>
                  )}
                </ul>
              </div>
            </div>

            
            <div className="mt-6">
            <button
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-3 ${
                  availability
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500"
                    : "bg-gray-500 cursor-not-allowed"
                } text-white rounded-lg font-semibold text-lg transition-all duration-300`}
                disabled={!availability}
              >
                {availability ? "Book Now" : "Already Booked"}
              </button>
            </div>
            
          </div>
        </div>
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
            <p><span className="font-semibold">Car Model:</span> {carData.carModel}</p>
            <p><span className="font-semibold">Daily Rental Price:</span> ${carData.dailyRentalPrice}</p>

            <p><span className="font-semibold">Availability:</span> {carData.availability}</p>
            
            
           
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleDateChange(date, "start")}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full mt-2 p-2 bg-gray-700 text-white rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => handleDateChange(date, "end")}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full mt-2 p-2 bg-gray-700 text-white rounded-lg"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)} 
                className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking} 
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
