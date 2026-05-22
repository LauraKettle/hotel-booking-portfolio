import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Search() {

    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    async function handleSearch(e){
        e.preventDefault();
        if (searchText.trim() === ""){
            alert("Please enter a hotel name or destination");
            return;
        }

        try {
            const response = await axios.get(
                "http://localhost:5050/api/rooms"
            );

            const rooms = response.data;
            const searchValue = searchText.toLowerCase();
            const foundRoom = rooms.find((room) => {

                return(
                    room.name.toLowerCase().includes(searchValue) ||
                    room.location.toLowerCase().includes(searchValue)
                );
            });

            if (foundRoom) {
                navigate(`/rooms/${foundRoom.id}`);
            } else{
                alert("No room or destination found. Please try again.");
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong with the search.");
        }
    }
    

return(
   <>
   

   <div className="search-page">
    <div className="search-card">
        <h1>Find your stay</h1>

        <p className="search-intro">
            Search by hotel name or destination
        </p>

        <form onSubmit={handleSearch}>
            <div className="search-field">
                <label>Hotel or Destination</label>

                <input 
                    type="text"
                    placeholder="Example: Rome, Paris, Standard Room"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                 />
            </div>
            <button type="submit" className="search-page-button">Search</button>
        </form>
    </div>
   </div>
   </>
);
}

export default Search;