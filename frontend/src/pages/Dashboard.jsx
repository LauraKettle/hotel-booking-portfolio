import { useState, useEffect } from "react";
function Dashboard() {
    const [current_user, setUser] = useState("");
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    })
    const [id] = useState(current_user.id || "");
    const [email] = useState(current_user.email || "");
    const [firstname] = useState(current_user.firstname || "");
    const [surname] = useState(current_user.surname || "");
    return(
        <div>
            <h1>Dashboard</h1>
            <p>Welcome back. Here you will later see your active and past bookings.</p>
            <div className="columns">
                <div className="rows">
                    <label htmlFor="dashboard-id">Account Number</label>
                    <label htmlFor="dashboard-email">Email</label>
                </div>
                <div className="rows">
                    <input
                    id="dashboard-id"
                    type="text"
                    placeholder="Account Number"
                    required
                    />
                    <input 
                    id="dashboard-email"
                    type="email"
                    placeholder="123@email.com"
                    required
                    />
                </div>
            </div>
            <div className="columns">
                <div className="rows">
                    <label htmlFor="dashboard-first-name">First Name</label>
                    <label htmlFor="dashboard-surname">Surname</label>
                </div>
                <div className="rows">
                    <input
                    id="dashboard-first-name"
                    type="text"
                    placeholder="First Name"
                    required
                    />
                    <input
                    id="dashboard-surname"
                    type="text"
                    placeholder="Surname"
                    required
                    />
                </div>
            </div>
            <div className="column">
                <div className="rows">
                    <label htmlFor="dashboard-password">Password</label>
                </div>
                <div className="rows">
                    <input
                    id="dashboard-password" 
                    type="password"
                    placeholder="**********"
                    required
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;