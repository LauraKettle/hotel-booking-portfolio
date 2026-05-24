import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const savedUser = sessionStorage.getItem("user");

    if (!savedUser) {
      alert("Please log in before booking");
      return;
    }

    const currentUser = JSON.parse(savedUser);

    try {
      await axios.post("http://localhost:5050/api/bookings", {
        user_id: currentUser.id,
        room_id: id,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        guests: formData.guests
      });
      
      alert("Booking submitted successfully!");

    } catch (error) {
      console.log(error);
      alert("Booking failed");
    }

  };

  return (
    <div className="booking-page">
      <div className="reservation-card">
        <div className="booking-left">
        <h1>Book Room {id}</h1>

        <p>
          Fill in your details below to reserve this room.
        </p>
        </div>

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
            min={new Date().toISOString().split("T")[0]}
            required
          />

          <label>Check-out Date</label>

          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            min={formData.checkIn}
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
