
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../index.js";

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

const auth = {
    register: (req, res) => {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({ msg: "Будь ласка, введіть логін або пароль" });
        }

        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if(err) {
                return res.status(500).json({ msg: "Помилка в базі данних" });
            }

            if(results.length > 0) {
                return res.status(400).json({ msg: "Вибачте користувач вже зареєстрован" });
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({ msg: "Помилка на сервері" });
                }
    
                const query = "INSERT INTO users (username, password) VALUES (?, ?)";
                db.query(query, [username, hash], (err) => {
                    if(err) {
                        return res.status(500).json({ msg: "Помилка в базі данних" });
                    }
    
                    res.status(201).json({ msg: "Користувач зареєстрован!" })
                });
            });
        });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({ msg: "Будь ласка, введіть логін або пароль" });
        }

        const query = 'SELECT * FROM users WHERE username = ?';

        db.query(query, [username], (err, results) => {
            if(err) {
                return res.status(500).json({ msg: "Помилка в базі данних" });
            }

            if(results.length === 0) {
                return res.status(400).json({ msg: "Користувача не існує" });
            }

            const user = results[0];
            console.log(results, password, user.password)
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) {
                    return res.status(500).json({ msg: "Помилка на сервері" });
                }

                if(!isMatch) {
                    return res.status(400).json({ msg: "Дані не вірні" });
                }

                const token = jwt.sign({ id: user.id }, process.env.JWT_PASS, { expiresIn: maxAge }); 
                res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000, secure: false });
                res.status(200).json({ token });
            })
        });
    },

    verify: (req, res, next) => {
        const token = req.cookies.jwt;

        if(!token) {
            return res.status(401).json({ msg: "Немає токену, авторизація відхилена" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_PASS);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(400).json({ msg: "Токен невалідний" });
        }
    },

    protected: (req, res) => {
        res.status(200).json({ msg: 'Ви змогли зайти на захищений шлях', user: req.user });
    }
};

export default auth;