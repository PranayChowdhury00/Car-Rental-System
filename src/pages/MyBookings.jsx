import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Modal component for confirmation and date modification
const Modal = ({ show, onClose, onConfirm, title, message, children }) => {
    if (!show) return null;
    return (
        <div className="modal" style={{ display: "block" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showModifyDateModal, setShowModifyDateModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/myBooking?email=${user?.email}`);
                if (!response.ok) throw new Error("Failed to fetch bookings.");
                const data = await response.json();
                setBookings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) fetchBookings();
    }, [user?.email]);

    const handleCancelBooking = (booking) => {
        setSelectedBooking(booking);
        setShowCancelModal(true);
    };

    const handleModifyBooking = (booking) => {
        setSelectedBooking(booking);
        setStartDate(new Date(booking.startDate)); // Prepopulate with existing booking dates
        setEndDate(new Date(booking.endDate)); // Prepopulate with existing booking dates
        setShowModifyDateModal(true);
    };

    const cancelBooking = async () => {
        try {
            const response = await fetch("http://localhost:5000/cancelBooking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId: selectedBooking._id }),
            });
            if (!response.ok) throw new Error("Failed to cancel booking.");
            setBookings(bookings.filter((car) => car._id !== selectedBooking._id));
            setShowCancelModal(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const modifyBookingDate = async () => {
        if (!startDate || !endDate) {
            setError("Please select both start and end dates.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/modifyBookingDate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookingId: selectedBooking._id,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                }),
            });
            if (!response.ok) throw new Error("Failed to modify booking date.");
            setBookings(bookings.map((car) =>
                car._id === selectedBooking._id
                    ? { ...car, startDate: startDate.toISOString(), endDate: endDate.toISOString() }
                    : car
            ));
            setShowModifyDateModal(false);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>My Bookings</h1>
            {loading && <p>Loading your bookings...</p>}
            {error && <p>Error: {error}</p>}

            {bookings.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Car Image</th>
                            <th>Car Model</th>
                            <th>Booking Date</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((car) => (
                            <tr key={car._id}>
                                <td><img src={car.imageUrl} alt={car.carModel} style={{ width: "100px" }} /></td>
                                <td>{car.carModel}</td>
                                <td>{new Date(car.bookingDate).toLocaleString()}</td>
                                <td>${car.totalPrice}</td>
                                <td>{car.status}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleCancelBooking(car)}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-primary" onClick={() => handleModifyBooking(car)}>
                                        Modify Date
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>You have no bookings yet.</p>
            )}

            {/* Cancel Booking Modal */}
            <Modal
                show={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                onConfirm={cancelBooking}
                title="Cancel Booking"
                message={`Are you sure you want to cancel the booking for ${selectedBooking?.carModel}?`}
            />

            {/* Modify Booking Date Modal */}
            <Modal
                show={showModifyDateModal}
                onClose={() => setShowModifyDateModal(false)}
                onConfirm={modifyBookingDate}
                title="Modify Booking Date"
                message={`Modify the booking date for ${selectedBooking?.carModel}`}
            >
                <div>
                    <label>Start Date:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                    />
                    <br />
                    <label>End Date:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={startDate || new Date()}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default MyBookings;
