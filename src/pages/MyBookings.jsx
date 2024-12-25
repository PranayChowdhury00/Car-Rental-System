import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCheck, FaTrash } from "react-icons/fa";
import { format } from "date-fns"; // Import for date formatting

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/my-booking/email?email=${user.email}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [user?.email]);

  const handleStatusChange = (id) => {
    axios.patch(`http://localhost:5000/confirm/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Order Confirmed",
          icon: "success",
        });
        window.location.reload(true);
      } else {
        Swal.fire({
          title: "Order not updated",
          icon: "warning",
        });
      }
    });
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
    axios.patch(`http://localhost:5000/cancel/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Cancelled Order",
          icon: "warning",
        });
        window.location.reload(true);
      } else {
        Swal.fire({
          title: "Order not updated",
          icon: "warning",
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>

        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="border border-gray-300 px-4 py-2">Car Image</th>
                <th className="border border-gray-300 px-4 py-2">Car Model</th>
                <th className="border border-gray-300 px-4 py-2">
                  Booking Date
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Price
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Booking Status
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
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
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <img
                      src={booking.imageUrl}
                      alt={booking.carModel}
                      className="h-12 w-12 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {booking.carModel || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {booking.dateAdded
                      ? format(new Date(booking.dateAdded), "dd-MM-yyyy HH:mm")
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    ${booking.dailyRentalPrice * booking.numberOfDays || "0.00"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {booking.bookingStatus}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {booking.bookingStatus === "pending" && (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleCancelConfirm(booking._id)}
                          className="px-2 py-1 text-sm bg-red-500 text-white rounded shadow hover:bg-red-600 flex items-center gap-1"
                        >
                          <FaTrash /> Cancel
                        </button>
                        <button
                          onClick={() => handleStatusChange(booking._id)}
                          className="px-2 py-1 text-sm bg-green-500 text-white rounded shadow hover:bg-green-600 flex items-center gap-1"
                        >
                          <FaCheck /> Confirm
                        </button>
                      </div>
                    )}
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

export default MyBookings;
