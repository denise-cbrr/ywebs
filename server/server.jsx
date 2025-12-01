// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "PCHsun777!",
//     database: ywebs
// });
// app.listen(8080, () => {
//     console.log("Listening...");
// });

// const corsOptions = {
//     origin: ["http://localhost:5173"],
// };

// app.use(cors(corsOptions));
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: 
// })

// app.listen(8080, () => {
//     console.log("Server started on http://localhost:8080/api");
// });
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PChsun777!",
    database: "ywebs"
});

// USER REGISTRATION
app.post("/register", (req, res) => {
    const { email, password, role } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send("Error hashing password");

        const sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
        db.query(sql, [email, hashedPassword, role], (err, result) => {
            if (err) return res.status(500).send("Email already used");
            res.send("User registered");
        });
    });
});

// USER LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, data) => {
        if (err) return res.status(500).send("Server error");
        if (data.length === 0) return res.status(401).send("User not found");

        const user = data[0];

        bcrypt.compare(password, user.password, (err, match) => {
            if (!match) return res.status(401).send("Incorrect password");

            res.json({
                message: "Login successful",
                id: user.id,
                email: user.email,
                role: user.role
            });
        });
    });
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});