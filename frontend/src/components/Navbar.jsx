import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; 


function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        function handleScroll(){
            setScrolled(window.scrollY > 80);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return(
        <nav className={scrolled ? "navbar scrolled" : "navbar"}>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/rooms">Rooms</Link>
                <Link to="/search">Search</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>

        </nav>
    );
}

export default Navbar;