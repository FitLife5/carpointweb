const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Підключення до MySQL у XAMPP
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'carpoint_db'
});

db.connect((err) => {
    if (err) {
        console.error('Помилка підключення до БД:', err.message);
    } else {
        console.log('Успішно підключено до MySQL (XAMPP)');
    }
});

// Отримати список авто
app.get('/api/cars', (req, res) => {
    db.query('SELECT * FROM cars', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Реєстрація
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Заповніть email та пароль' });
    }
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name || 'User', email, password], (err, result) => {
        if (err) return res.status(400).json({ error: 'Користувач вже існує або помилка БД' });
        res.json({ message: 'Реєстрація успішна!', userId: result.insertId });
    });
});

// Логін
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT id, name, email FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(401).json({ error: 'Невірний email або пароль' });
        }
        res.json({ message: 'Вхід успішний!', user: results[0] });
    });
});

app.listen(5000, () => {
    console.log('СЕРВЕР ПРАЦЮЄ НА PORT 5000');
});