import { Link, useParams } from "react-router-dom";
import roomImage from "../assets/hotelRoom1.avif";
import "index.css";

function RoomDetails() {
  const { id } = useParams();

  const room = {
    id: id,
    name: "Deluxe Double Room",
    image: roomImage,
    price: 120,
    capacity: 2,
    bedType: "1 Double Bed",
    description:
      "A comfortable deluxe room with a private bathroom, free Wi-Fi, air conditioning, and city views.",
    facilities: [
      "Free Wi-Fi",
      "Private Bathroom",
      "TV",
      "Air Conditioning",
    ],
  };

  return (
    <div className="booking-page">
      <div className="booking-details-card">
        <img
          className="booking-room-image"
          src={room.image}
          alt={room.name}
        />

        <div className="booking-room-info">
          <h1>{room.name}</h1>

          <h2>€{room.price} per night</h2>

          <p>
            <strong>Capacity:</strong> {room.capacity} guests
          </p>

          <p>
            <strong>Bed Type:</strong> {room.bedType}
          </p>

          <p>{room.description}</p>

          <h3>Facilities</h3>

          <ul className="booking-facility-list">
            {room.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>

          <Link to={`/rooms/${room.id}/book`}>
            <button className="booking-primary-btn">
              Book This Room
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
