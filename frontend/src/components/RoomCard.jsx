import { Link } from "react-router-dom";
import starIcon from "../assets/starIcon.svg";
import locationIcon from "../assets/locationIcon.svg";

function RoomCard({room}) {
    return (
        <div className="room-card">
            <div className="image-box">
                {room.bestseller && (
                    <span className="badge">Best Seller</span>
                )}

                <img src={room.image} alt={room.name} />
            </div>

            <div className="room-card-body">
                <h3>{room.name}</h3>
                <p className="rating">
                    <img src={starIcon} alt="Star-rating" className="card-icon" />
                    <span>5.0</span>
                </p>

                <p className="location">
                    <img src={locationIcon} alt="Location" className="card-icon" />
                    Rome, Italy
                </p>

                <div className="card-bottom">
                    <p className="price">
                        €{room.price} per night
                    </p>

                    <Link to={`/rooms/${room.id}`}
                    className="book-button">
                        Book Now
                        
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default RoomCard;