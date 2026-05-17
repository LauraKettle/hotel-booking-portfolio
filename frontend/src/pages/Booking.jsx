import { useState } from "react";
import { useParams } from "react-router-dom";
import "index.css";

function RoomBooking() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const bookingData = {
      roomId: id,
      ...formData,
    };

    console.log("Booking submitted:", bookingData);

    alert("Booking submitted successfully!");
  };

  return (
    <div className="booking-page">
      <div className="reservation-card">
        <h1>Book Room {id}</h1>

        <p>
          Fill in your details below to reserve this room.
        </p>

        <form
          onSubmit={handleSubmit}
          className="reservation-form"
        >
          <label>Full Name</label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Check-in Date</label>

          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
          />

          <label>Check-out Date</label>

          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
          />

          <label>Guests</label>

          <input
            type="number"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            required
          />

          <button
            className="booking-primary-btn"
            type="submit"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomBooking;
