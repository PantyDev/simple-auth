import express from "express";
import mysql from "mysql2";
import cookieParser from "cookie-parser";
import path from 'path';

import apiRoutes from "./routes/api.js";
import pageRoutes from "./routes/pages.js";

const __dirname = path.resolve();

const app = express(); 
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");
app.use(express.static(__dirname + '/public'));

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

app.use('/api', apiRoutes); 
app.use('/', pageRoutes);

export { db, app };