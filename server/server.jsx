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

import { BucketManager, ObjectManager } from "@filebase/sdk";

const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const s3_key = '679415713CE7280FA331';
const s3_secret = 'LQPJN8loEex8Mf6RYLmRcSRAljTKXp2o9Y592n4R';
const ywebs = 'ywebs';

const app = express();
app.use(cors());
app.use(express.json());

const bucketManager = new BucketManager(s3_key, s3_secret);
await bucketManager.create(ywebs);

const objectManager = new ObjectManager(s3_key, s3_secret, {
    bucket: ywebs
});

app.post("/add", (req, res) => { 
    const { name, college, year, bio, email, projects } = req.body;

    const fileContent = Buffer.from(req.body);
    const uploadedObject = away objectManager.upload()

})

const fileContent = Buffer.from('hello, Filebase');
const uploadedObject =  await objectManager.upload('myfile.txt', fileContent);
console.log('File uploaded:', uploadedObject.cid);




// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "PChsun777!",
//     database: "ywebs"
// });

// // USER REGISTRATION
// app.post("/register", (req, res) => {
//     const { email, password, role } = req.body;

//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//         if (err) return res.status(500).send("Error hashing password");

//         const sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
//         db.query(sql, [email, hashedPassword, role], (err, result) => {
//             if (err) return res.status(500).send("Email already used");
//             res.send("User registered");
//         });
//     });
// });

// // USER LOGIN
// app.post("/login", (req, res) => {
//     const { email, password } = req.body;

//     db.query("SELECT * FROM users WHERE email = ?", [email], (err, data) => {
//         if (err) return res.status(500).send("Server error");
//         if (data.length === 0) return res.status(401).send("User not found");

//         const user = data[0];

//         bcrypt.compare(password, user.password, (err, match) => {
//             if (!match) return res.status(401).send("Incorrect password");

//             res.json({
//                 message: "Login successful",
//                 id: user.id,
//                 email: user.email,
//                 role: user.role
//             });
//         });
//     });
// });

// app.listen(8080, () => {
//     console.log("Server running on port 8080");
// });