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

 app.get("/api/rooms", (req, res) => {
    res.json(rooms);
});

//single room :id

app.get("/api/rooms/:id", (req, res) => {
     const roomId = Number(req.params.id);

    const room = rooms.find((room) => room.id === roomId);

     if (!room) {
        return res.status(404).json({
            message: "Room not found"
        });
    }

     res.json(room);

});

//GET room ratings
app.get("/api/ratings/room/:id", (req, res) => {

    const roomId = req.params.id;

    const sql = 
    `SELECT AVG(rating_value) AS averageRating
    FROM ratings
    WHERE room_id = ?`;

    db.query(sql, [roomId], (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }
        res.json({
            averageRating: Number(results[0].averageRating).toFixed(1)
        });
    });
});

//POST room ratings
app.post("/api/ratings", (req, res) => {
    const {
        room_id,
        user_id,
        rating_value
    } =req.body;

    const sql = `
    INSERT INTO ratings
    (room_id, user_id, rating_value)
    VALUES (?, ?, ?)`;

    db.query(
        sql,
        [room_id, user_id, rating_value],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            res.status(201).json({
                message: "Rating added successfully"
            });

        
        }
    );
});

//registration
app.post('/api/register', async (req, res) => {
  const { first_name, surname, email, password, signup } = req.body;
  const hash_password = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (firstname, surname, email, user_password, newsletter) VALUES (?, ?, ?, ?, ?)', [first_name, surname, email, password, signup]);
  res.sendStatus(201);
});   
//start server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

