import React from 'react';
import heroImage from "../assets/heroBackground.png";
import Navbar from '../components/Navbar';
import RoomCard from "../components/RoomCard";
import { useEffect, useState } from 'react';
import axios from 'axios';
import hotelRoom1 from "../assets/hotelRoom1.avif";
import hotelRoom2 from "../assets/hotelRoom2.avif";
import hotelRoom3 from "../assets/hotelRoom3.avif";
import hotelRoom4 from "../assets/hotelRoom4.jpg";


function Home(){

  const [rooms, setRooms] = useState([]);

  const roomImages = {                                    
    1: hotelRoom1, 
    2: hotelRoom2, 
    3: hotelRoom3,
    4: hotelRoom4
  };

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await axios.get("http://localhost:5050/api/rooms");
        setRooms(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchRooms();
  }, []);

  return (
    <>
    

    <section
      className='hero-section'
      style={{backgroundImage: `url(${heroImage})`}}>
        <div className='hero-content'>
          <h1>Discover Your Perfect Getaway</h1>
          <p>
            Book now and enjoy luxury rooms, beautiful destinations, and unforgettable moments.
          </p>

        </div>
      </section>

      <section className='featured-hotels'>
        {rooms.map((room) => (
          <RoomCard key={room.room_id} room={{...room, id: room.room_id, image: roomImages[Number(room.room_id)]}} />
        ))}

      </section>

      
    </>
  );
}

export default Home