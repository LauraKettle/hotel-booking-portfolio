import { useState } from "react";
import { Link } from "react-router-dom";
import BackImage from "../assets/HotelLobby.png";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:5050/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, 
                password
            })
            });
            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem("user", JSON.stringify(data.user));
                console.log(localStorage.getItem("user"))
                alert("Login Successful");
            }
            else {
                const message = await response.text();
                console.log(response.status);
                alert(message);
            }
    }

    return(
        <div className="reg_spacing" style={{backgroundImage: `url(${BackImage})`}}>
            <form onSubmit={handleSubmit} style={{backgroundColor: "white"}}>
                <h1>Login</h1>
                <input 
                    type="email"
                    placeholder="123@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required/>

                <input 
                    type="password"
                    placeholder="**********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required/>

                <button type="submit">Login</button>
                <p>No Account? <Link to="/register">Register with us Now!</Link></p>
            </form>
        </div>
    );
}

export default Login;