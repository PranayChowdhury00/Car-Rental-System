import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCalendarAlt, FaTrash } from "react-icons/fa";
import { format } from "date-fns"; // Import for date formatting
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/my-booking/email?email=${user.email}`, {
          withCredentials: true
        })
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [user?.email]);

  // Prepare chart data for daily rental price vs car model
  const chartData = {
    labels: bookings.map(booking => booking.carModel), // Car models as labels
    datasets: [
      {
        label: 'Daily Rental Price',
        data: bookings.map(booking => booking.dailyRentalPrice), // Prices of cars
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const handleCancelConfirm = (id) => {
    Swal.fire({
      title: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatusCancel(id);
      }
    });
  };

  const handleStatusCancel = (id) => {
    axios
      .patch(`http://localhost:5000/cancel/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Cancelled Order",
            icon: "success",
          });
          setBookings((prev) => prev.filter((booking) => booking._id !== id));
        } else {
          Swal.fire({
            title: "Order not updated",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error cancelling booking:", error);
        Swal.fire({
          title: "Failed to cancel order",
          icon: "error",
        });
      });
  };

  const handleModifyBooking = (id) => {
    const booking = bookings.find((b) => b._id === id);
    setSelectedBooking(booking);
    setNewStartDate(new Date(booking.startDate));
    setNewEndDate(new Date(booking.endDate));
    setIsModalOpen(true);
  };

  const handleConfirmModification = () => {
    if (!newStartDate || !newEndDate || newStartDate >= newEndDate) {
      Swal.fire({
        title: "Invalid Dates",
        text: "Please ensure the start date is before the end date.",
        icon: "error",
      });
      return;
    }

    axios
      .patch(`http://localhost:5000/modify-booking/${selectedBooking._id}`, {
        startDate: newStartDate,
        endDate: newEndDate,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Booking Updated",
            icon: "success",
          });

          setBookings((prev) =>
            prev.map((b) =>
              b._id === selectedBooking._id
                ? { ...b, startDate: newStartDate, endDate: newEndDate }
                : b
            )
          );

          setIsModalOpen(false);
          setSelectedBooking(null);
        }
      })
      .catch((error) => {
        console.error("Error updating booking:", error);
        Swal.fire({
          title: "Failed to Update",
          text: "Please try again later.",
          icon: "error",
        });
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">My Bookings</h1>

      {loading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : bookings.length === 0 ? (
        <div className="text-center">No Bookings</div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Car Rental Prices</h2>
            <Bar data={chartData} />
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="border px-4 py-2">Car Image</th>
                  <th className="border px-4 py-2">Car Model</th>
                  <th className="border px-4 py-2">Start Date</th>
                  <th className="border px-4 py-2">End Date</th>
                  <th className="border px-4 py-2">Total Price</th>
                  <th className="border px-4 py-2">Booking Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className={`hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="border px-4 py-2 text-center">
                      <img
                        src={booking.imageUrl}
                        alt={booking.carModel}
                        className="h-12 w-12 object-cover mx-auto rounded"
                      />
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {booking.carModel || "N/A"}
                    </td>
                    <td className="border px-4 py-2 text-center ">
                      {format(new Date(booking.startDate), "dd-MM-yyyy HH:mm")}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {format(new Date(booking.endDate), "dd-MM-yyyy HH:mm")}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      $
                      {(
                        (booking.dailyRentalPrice *
                          (new Date(booking.endDate) -
                            new Date(booking.startDate))) /
                        (1000 * 60 * 60 * 24)
                      ).toFixed(2)}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {booking.bookingStatus}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleCancelConfirm(booking._id)}
                          className="px-2 py-1 text-sm bg-red-500 text-white rounded shadow hover:bg-red-600 flex items-center gap-1"
                        >
                          <FaTrash /> Cancel
                        </button>
                        <button
                          onClick={() => handleModifyBooking(booking._id)}
                          className="px-2 py-1 text-sm bg-blue-500 text-white rounded shadow hover:bg-blue-600 flex items-center gap-1"
                        >
                          <FaCalendarAlt /> Modify Date
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Modify Booking</h2>
            <div className="mb-4">
              <label className="block mb-2">Start Date</label>
              <DatePicker
                selected={newStartDate}
                onChange={(date) => setNewStartDate(date)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">End Date</label>
              <DatePicker
                selected={newEndDate}
                onChange={(date) => setNewEndDate(date)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmModification}
                className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded shadow hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
