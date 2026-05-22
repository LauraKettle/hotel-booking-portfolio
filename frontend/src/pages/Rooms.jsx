
import RoomCard from "../components/RoomCard";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import hotelRoom1 from "../assets/hotelRoom1.avif";
import hotelRoom2 from "../assets/hotelRoom2.avif";
import hotelRoom3 from "../assets/hotelRoom3.avif";
import hotelRoom4 from "../assets/hotelRoom4.jpg";

function Rooms(){
    const [rooms, setRooms] = useState([]);                //stores room data from API

    const roomImages = {                                    //adding the room images
        1: hotelRoom1, 
        2: hotelRoom2, 
        3: hotelRoom3,
        4: hotelRoom4
    };

    useEffect(() => {                                       //running the code when the page loads
        async function fetchRooms() {
            try {
                const response = await axios.get(           //ask backend for the room data
                    "http://localhost:5050/api/rooms"
                );

                setRooms(response.data);                    //stores the API data into React state
            } catch (error) {
                console.log(error);
            }
        }

        fetchRooms();
    }, []);


    return(
        <>
        

        <div className="rooms-page">
            <h1 className="rooms-title">Available Rooms</h1>

            <div className="rooms-container">
                {rooms.map((room) => (
                    <RoomCard key={room.room_id} room={{...room, id: room.room_id, image: roomImages[Number(room.room_id)]}} />
                ) )}
            </div>
        </div>
        </>
    );
}

export default Rooms;