import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import hotelRoom1 from "../assets/hotelRoom1.avif";
import hotelRoom2 from "../assets/hotelRoom2.avif";
import hotelRoom3 from "../assets/hotelRoom3.avif";
import hotelRoom4 from "../assets/hotelRoom4.jpg";
import starIcon from "../assets/starIcon.svg";

function RoomDetails() {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);

  const roomImages = {
    1: hotelRoom1,
    2: hotelRoom2,
    3: hotelRoom3,
    4: hotelRoom4
  };

  useEffect(() => {
    async function fetchRoomDetails() {
      try {
        const roomResponse = await axios.get(
          `http://localhost:5050/api/rooms/${id}`
        );
        setRoom(roomResponse.data);

        const ratingResponse = await axios.get(
          `http://localhost:5050/api/ratings/room/${id}`
        );

        setAverageRating(ratingResponse.data.averageRating);

      } catch (error) {
        console.log(error);
      }
    }
    fetchRoomDetails();
  }, [id]);

  async function submitRating() {
    if (selectedRating === 0) {
      alert("Please select a rating");
      return;
    }

    const savedUser = sessionStorage.getItem("user");

    if (!savedUser){
      alert("Please log in to submit a rating");
      return;
    }

    const currentUser = JSON.parse(savedUser);

    try{
      await axios.post("http://localhost:5050/api/ratings", {
        room_id: id,
        user_id: currentUser.id,
        rating_value: selectedRating
      });

      alert("Rating submitted");
      const ratingResponse = await axios.get(
        `http://localhost:5050/api/ratings/room/${id}`
      );
      setAverageRating(ratingResponse.data.averageRating);
      setSelectedRating(0);
    } catch (error) {
      console.log(error);
    }
  }

  if (!room) {
    return <h1>Loading room details...</h1>;
  }

  return (
    <div className="booking-page">
      <div className="booking-details-card">
        <img
          className="booking-room-image"
          src={roomImages[room.room_id]}
          alt={room.name || room.room_name}
        />

        <div className="booking-room-info">
          <h1>{room.name || room.room_name}</h1>

          <h2>€{room.price} per night</h2>

          <p>
            <strong>Location:</strong> {room.location} 
          </p>

          <p>
            <strong>Description</strong> {" "} 
            {room.description}
          </p>

          <h3>Facilities</h3>

          <ul className="booking-facility-list">
             <li>Free Wi-Fi</li>
              <li>Private Bathroom</li>
             <li>TV</li>
             <li>Air Conditioning</li>
          </ul>

          <div className="rating-section">
            <h3>Room Rating</h3>
            <p>
              Average Rating:{" "}
              {averageRating ? `${averageRating} / 5` : "No Ratings yet"}
            </p>

            <div className="star-buttons">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                key={star}
                  type="button"
                  className="star-button"
                  onClick={() => setSelectedRating(star)}>
                    <img src={starIcon}
                         alt="star"
                         className={selectedRating >= star ? "rating-star selected-star" : "rating-star"} />
                </button>
              ))}
            </div>

              <button
                type="button"
                onClick={submitRating}
                className="booking-primary-btn rating-submit-btn">
                  Submit Rating

              </button>

          </div>


          <Link to={`/booking/${id}`}
           className="booking-primary-btn">
              Book This Room
           </Link>

        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
