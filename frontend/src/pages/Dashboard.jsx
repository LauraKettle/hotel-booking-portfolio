import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Dashboard() {
    const [currentUser, setCurrentUser] = useState(null);
    const [bookings_array, setBookings] = useState([]);
    const bookings = [
        {
            booking_id: 1,
            room_name: "Family Room",
            location: "Lisbon, Portugal",
            check_in: "2026-06-10",
            check_out: "2026-06-14",
            status: "Confirmed",
            price: 250
        }
    ];

    useEffect(() => {
        const savedUser = sessionStorage.getItem("user");

        if(savedUser) {
            setCurrentUser(JSON.parse(savedUser));
            async function fetchBookings() {
                const response = await fetch("http://localhost:5050/api/bookings/user/${currentUser.id}");
                const data = await response.json();
                setBookings(data);
                console.log(data)
            }
            fetchBookings();
        }
    }, []);

    if (!currentUser) {
        return (
            <div className="dashboard-page">
                <h1>Dashboard</h1>
                <p>Please <Link to="/login">Login</Link> to view your dashboard. If you do not have an account yet, please <Link to="/register"> Register now</Link>!</p>

            </div>
        );
    }
    return (
        <div className="dashboard-page">
            <section className="dashboard-profile-card">
                <h1>Welcome back, {currentUser.firstname}</h1>
                <p>
                    <strong>Account Number:</strong> {currentUser.id}
                </p>
                <p>
                    <strong>Email:</strong> {currentUser.email}
                </p>
                <p>
                    <strong>Name:</strong> {currentUser.firstname} {currentUser.surname}
                </p>

            </section>

            <section className="dashboard-bookings-section">
                <h2>Your Bookings</h2>

                <div className="dashboard-bookings-grid">
                    {bookings_array.map((booking) => (
                        <div className="booking-card" key={booking.booking_id}>
                            <h3>{booking.name}</h3>
                            <p>{booking.location}</p>
                            <p>
                                <strong>Check-out:</strong> {booking.check_out}
                            </p>
                            <p>
                                <strong>Price:</strong> €{booking.price} per night
                            </p>

                            <span>{booking.status}</span>
                        </div>
                    ))}

                </div>

            </section>
        </div>
    );
}

export default Dashboard;