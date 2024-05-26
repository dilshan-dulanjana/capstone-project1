const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
// const bcrypt = require('bcrypt'); // Commented out bcrypt

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "capstoneproject"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

app.post('/signup', (req, res) => {
    const { name, email, password, category } = req.body;

    try {
        const sql = "INSERT INTO users (`name`, `email`, `password`, `category`) VALUES (?, ?, ?, ?)";
        const values = [name, email, password, category];

        db.query(sql, values, (err, data) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json("Error");
            }
            return res.json(data);
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json("Error");
    }
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE `email` = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json("Error");
        }

        if (data.length > 0) {
            const user = data[0];
            const validPassword = password === user.password;

            if (validPassword) {
                return res.json({ message: "success", category: user.category });
            } else {
                return res.status(401).json("Invalid email or password");
            }
        } else {
            return res.status(401).json("Invalid email or password");
        }
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
