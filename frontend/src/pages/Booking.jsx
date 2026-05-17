import { useState } from "react";
import { useParams } from "react-router-dom";
// import "App.css";

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
    <div>
      <h1>Book Room {id}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Check-in Date</label>
          <br />
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Check-out Date</label>
          <br />
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Guests</label>
          <br />
          <input
            type="number"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default RoomBooking;
