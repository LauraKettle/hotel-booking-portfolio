import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Dashboard() {
    const [currentUser, setCurrentUser] = useState(null);
    const [bookings, setBookings] = useState([]);



    useEffect(() => {
        const savedUser = sessionStorage.getItem("user");

        if(savedUser) {
            const user = JSON.parse(savedUser);
            setCurrentUser(user);

            async function fetchBookings() {
                try{
                    const response = await fetch(`http://localhost:5050/api/bookings/user/${user.id}`);
                    const data = await response.json();
                    setBookings(data);
                } catch (error){
                    console.log(error);
                }

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

                {bookings.length === 0 ? (
                    <p>You have no bookings yet.</p>
                ) : (

                <div className="dashboard-bookings-grid">
                    {bookings.map((booking) => (
                        <div className="booking-card" key={booking.booking_id}>
                            <h3>{booking.name}</h3>
                            <p>{booking.location}</p>
                            <p>
                                <strong>Check-in:</strong> {booking.check_in}
                            </p>
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
                )}
            </section>
        </div>
    );
}

export default Dashboard;