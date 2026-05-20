import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react"; 
import searchIcon from "../assets/searchIcon.svg";
import menuIcon from "../assets/menuIcon.svg";
import closeIcon from "../assets/closeIcon.svg";


function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();  
    const isHomePage = location.pathname === "/";
    
    useEffect(() => {
        function handleScroll(){
            setScrolled(window.scrollY > 80);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

        function closeMenu() {
            setMenuOpen(false);
        }

    return(
        <nav className={`navbar ${scrolled ? "scrolled" : ""} ${!isHomePage ? "other-page" : ""}`}>

            <div className={`nav-links ${menuOpen ? "active" : ""}`}>
                <Link to="/" onClick={closeMenu}>Home</Link>
                <Link to="/rooms" onClick={closeMenu}>Rooms</Link>
                <Link to="/register" onClick={closeMenu}>Register</Link>
                <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
            </div>


            <div className="nav-actions">
                <Link to="/search" className="search-link">
                <img src={searchIcon} alt="search" className="search-icon" />
                </Link>

                <Link to="/login" className="login-button">Login
                </Link>

                <button className="burger-button" 
                        onClick={() => setMenuOpen((previousState) => !previousState)}>
                <img src={menuOpen ? closeIcon : menuIcon} 
                     alt={menuOpen ? "Close menu" : "Open Menu"}
                     className="burger-menu" />
                </button>

            </div>

        </nav>
    );
}

export default Navbar;