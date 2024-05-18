const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "2002",
    port: 5432,
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
        await pool.query(query, [name, email, password]);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error" });
    }
});
app.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
        const result = await pool.query(query, [email, password]);
        if (result.rows.length > 0) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error while executing login query:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(8081, () => {
    console.log("Listening");
});
