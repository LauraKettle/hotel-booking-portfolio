import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from 'mysql2/promise';
import bcrypt from "bcryptjs"

dotenv.config(); //loads env variables

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;
//Database Pool Connection
const pool = await mysql.createPool({
    host: process.env.DB_HOST || 'autorack.proxy.rlwy.net',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'qwNyKJGVMdwWFloMAuFRWzSmtmlktvjS',
    database: process.env.DB_DATABASE || 'railway',
    port: process.env.DB_PORT || 17745
});

//Rooms data
const rooms = [
        {
        id: 1, 
        name: "Standard Room",
        location: "Rome, Italy",
        price: 120,
        description: "A Room With a Double bed, in the heart of Rome. Walking distance to all major attractions."
        },

        {
            id: 2, 
            name: "Deluxe Room",
            location: "Paris, France",
            price: 200,
            description: "A room with a King size bed, in the heart of Paris. Within walking distance to metro and all major attractions."
        },

        {
            id: 3,
            name: "Family Room",
            location: "Lisbon, Portugal",
            price: 250,
            description: "A room with a double bed and 2 single beds. Close to all major attractions."
        },

        {
            id: 4, 
            name: "Double Room",
            location: "coasta Brava, Spain",
            price: 175,
            description: "A room with a double room right on the beach. This room has a balcony with a sea view. "
        }
    ];

//home route

app.get("/", (req, res) => {
    res.send("Server is running");
});


//rooms API

 app.get("/api/rooms", async (req, res) => {
    try {
        const [rooms] = await pool.query("SELECT * FROM rooms");
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Database error"});
    }
});

//single room :id

app.get("/api/rooms/:id", async (req, res) => {
    try{
        const [rooms] = await pool.query(
            "SELECT * FROM rooms WHERE room_id = ?",
            [req.params.id]
        );

        if (rooms.length === 0) {
            return res.status(404).json({ message: "Room not found"});
        }
        res.json(rooms[0]);
    } catch (error) {
        res.status(500).json({message: "Database error"});
    }
});

//GET room ratings
app.get("/api/ratings/room/:id",  async (req, res) => {
    try{
        const roomId = req.params.id;

        console.log("Fetching rating for room:", roomId);

        const [results] = await pool.query(
            `SELECT AVG(rating_value) AS averageRating
            FROM ratings
            WHERE room_id = ?`,
            [roomId]
        );

        console.log("Rating results:", results);

        res.json({
            averageRating: results[0].averageRating
            ? Number(results[0].averageRating).toFixed(1)
            : null
        });
    } catch (error) {
        console.log("Rating route error:", error);

            res.status(500).json({ message: "Database error while fetching rating"});
        }
    
    });

//POST room ratings
app.post("/api/ratings", async (req, res) => {
    try {
        const { room_id, user_id, rating_value } =req.body;

        await pool.query(
             `INSERT INTO ratings (room_id, user_id, rating_value)
                VALUES (?, ?, ?)`,
                [room_id, user_id, rating_value]
        );

        res.status(201).json({
            message: "Rating added successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Database error "});
    }
});

//registration
app.post('/api/register', async (req, res) => {
  const { first_name, surname, email, password, signup } = req.body;
  const hash_password = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (firstname, surname, email, user_password, newsletter) VALUES (?, ?, ?, ?, ?)', [first_name, surname, email, hash_password, signup]);
  res.sendStatus(201);
});
//login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
        return res.status(401).send("Username not found. Please register with us before attempting login!");
    }

    const login_user = users[0];

    const match = await bcrypt.compare(password, login_user.user_password);

    if (!match) {
        return res.status(401).send("Password is incorrect. Please try again!");
    }

    return res.status(200).json({
        message: "Login successful",
        user: {
            id: login_user.user_id,
            email: login_user.email,
            firstname: login_user.firstname,
            surname: login_user.surname
        }
    });
});

//Create booking API
app.post("/api/bookings", async (req, res) => {
    try {
        const {
            user_id,
            room_id,
            check_in,
            check_out,
            guests
        } = req.body;

        if (
            !user_id ||
            !room_id ||
            !check_in ||
            !check_out ||
            !guests
        ) {
            return res.status(400).json({
                message: "All booking fields are required"
            });
        }

        const [result] = await pool.query(
            `INSERT INTO hotel_bookings
            (user_id, room_id, check_in, check_out, guests)
            VALUES (?, ?, ?, ?, ?)`,
            [
                user_id,
                room_id,
                check_in,
                check_out,
                guests
            ]
        );

        res.status(201).json({
            message: "Booking created successfully",
            booking_id: result.insertId
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Database error while creating booking"
        });
    }
});

//get booking for one user
app.get("/api/bookings/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const [bookings] = await pool.query(
            `SELECT
            hotel_bookings.booking_id,
            hotel_bookings.check_in,
            hotel_bookings.check_out,
            hotel_bookings.guests,
            rooms.name,
            rooms.location,
            rooms.price
            FROM hotel_bookings
            JOIN rooms ON hotel_bookings.room_id = rooms.room_id
            WHERE hotel_bookings.user_id = ?`,
            [userId]
        );
        res.json(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Database error while fetching bookings"
        });
    }
});

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
