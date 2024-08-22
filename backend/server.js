const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: 'viktor',
  host: 'localhost',
  database: 'vehicleDB',
  password: '102501',
  port: 5432,
});

// User Registration Endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const client = await pool.connect();
    const userExistsQuery = 'SELECT * FROM users WHERE email = $1';
    const userExistsResult = await client.query(userExistsQuery, [email]);

    if (userExistsResult.rows.length > 0) {
      client.release();
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
    await client.query(insertUserQuery, [name, email, hashedPassword]);
    client.release();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});