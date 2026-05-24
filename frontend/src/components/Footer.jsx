import { Link } from "react-router-dom";
import facebookIcon from "../assets/facebookIcon.svg";
import instagramIcon from "../assets/instagramIcon.svg";
import linkedinIcon from "../assets/linkendinIcon.svg";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h2>Hotel Booking</h2>
                <p>Find comfortable stays, beautiful destination and relaxing hotel experiences.</p>
            </div>

            <div className="footer-section">
                <h3>Quick Links</h3>

                <Link to="/">Home</Link>
                <Link to="/rooms">Rooms</Link>
                <Link to="/search">Search</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>

            </div>

            <div className="footer-section">
                <h3>Contact</h3>
                <p>Email: info@hotelbooking.com</p>
                <p>Phone: +353 123 4567</p>
                <p>Location: Dublin, Ireland</p>

            </div>

            <div className="footer-section">
                <h3>Follow us</h3>

                <div className="social-icons">
                    <img src={facebookIcon} alt="Facebook" />
                    <img src={instagramIcon} alt="Instagram" />
                    <img src={linkedinIcon} alt="LinkedIn" />

                </div>

            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 Hotel Booking. All rights reserved.</p>

            </div>
        </footer>
    );
}

export default Footer;