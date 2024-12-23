import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const CarDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [car, setCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch car details when the component mounts
    axios
      .get(`http://localhost:5000/car/${id}`)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        console.error('Error fetching car details:', error);
      });
  }, [id]);

  const handleBooking = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleConfirmBooking = async () => {
    if (!car) return;
  
    // Ensure bookingCount is initialized
    const updatedBookingCount = (car.bookingCount || 0) + 1;
  
    try {
      // Send PUT request to update the booking count
      const response = await axios.put(`http://localhost:5000/book-car/${id}`, {
        ...car,
        bookingCount: updatedBookingCount, // Increment booking count
      });
  
      if (response.status === 200) {
        // Update the state with the new booking count
        setCar((prevCar) => ({
          ...prevCar,
          bookingCount: updatedBookingCount,
        }));
  
        // Show success alert
        Swal.fire({
          title: 'Booking Confirmed!',
          text: `Your booking for ${car.carModel} has been confirmed.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        throw new Error('Failed to update booking count on the server.');
      }
    } catch (error) {
      console.error('Error updating booking count:', error);
  
      // Show error alert
      Swal.fire({
        title: 'Error!',
        text: 'Failed to confirm your booking. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setShowModal(false); // Close the modal
    }
  };
  

  if (!car) return <p className="text-center">Loading car details...</p>;

  const carImage = car.imageUrl || 'https://via.placeholder.com/500';

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img
            src={carImage}
            alt={car.carModel || 'Car Image'}
            className="rounded-lg shadow-lg w-full md:w-96"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-center">{car.carModel}</h1>
          <p className="mt-4 text-xl font-semibold text-gray-700">
            <strong>Price Per Day:</strong> ${car.dailyRentalPrice}
          </p>
          <p className="mt-2 text-lg font-medium text-gray-600">
            <strong>Availability:</strong> {car.availability}
          </p>
          <p className="mt-2 text-base text-gray-500">
            <strong>Features:</strong> {car.features.split(', ').join(', ')}
          </p>
          <p className="mt-2 text-base text-gray-500">
            <strong>Description:</strong> {car.description || 'No description available.'}
          </p>
          <p className="mt-2 text-base text-gray-500">
            <strong>Booking Count:</strong> {car.bookingCount}
          </p>

          <button
            className="mt-6 btn btn-primary w-full"
            onClick={handleBooking}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Modal for booking confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-box w-96 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Booking Confirmation</h2>
            <p className="text-lg">
              <strong>Car Model:</strong> {car.carModel}
            </p>
            <p className="text-lg">
              <strong>Price Per Day:</strong> ${car.dailyRentalPrice}
            </p>
            <p className="text-lg">
              <strong>Availability:</strong> {car.availability}
            </p>
            <p className="text-lg">
              <strong>Features:</strong> {car.features.split(', ').join(', ')}
            </p>
            <p className="text-lg">
              <strong>Description:</strong> {car.description || 'No description available.'}
            </p>

            <div className="modal-action flex justify-around mt-6">
              <button
                className="btn btn-success"
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
