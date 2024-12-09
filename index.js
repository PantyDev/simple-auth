import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cookieParser from "cookie-parser";

import auth from "./routs/auth.js";

const app = express(); 
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

const db = mysql.createConnection({
    host: "MariaDB-10.11",
    user: "root",
    password: "",
    database: "userauth"
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack); 
        return;
    }
    console.log('Connected to MySQL database');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.post("/api/register", auth.register);
app.post("/api/login", auth.login);
app.get("/api/protected", auth.verify, auth.protected)

export { db, app };