import { Link, useParams } from "react-router-dom";
import roomImage from "assets/hotelRoom1.avif";

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
      "A comfortable deluxe room with a private bathroom, free Wi-Fi and air conditioning.",
    facilities: ["Free Wi-Fi", "Private Bathroom", "TV", "Air Conditioning"],
  };

  return (
    <div>
      <h1>{room.name}</h1>

      <img src={room.image} alt={room.name} width="500" />

      <h2>€{room.price} per night</h2>

      <p>
        <strong>Capacity:</strong> {room.capacity} guests
      </p>

      <p>
        <strong>Bed Type:</strong> {room.bedType}
      </p>

      <p>{room.description}</p>

      <h3>Facilities</h3>

      <ul>
        {room.facilities.map((facility, index) => (
          <li key={index}>{facility}</li>
        ))}
      </ul>

      <Link to={`/rooms/${room.id}/book`}>
        <button>Book This Room</button>
      </Link>
    </div>
  );
}
export default RoomDetails;
