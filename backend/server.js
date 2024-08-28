const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Configure the PostgreSQL connection pool
const pool = new Pool({
  user: 'viktor',
  host: 'localhost',
  database: 'vehicleDB',
  password: '102501',
  port: 5432,
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await client.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      client.release();
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = userResult.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      client.release();
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    client.release();
    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/vehicles', async (req, res) => {
  const {
    carmark_id, carmodel_id, transport_id, regno, win, motor_no, reg_year, city,
    axes_number, fuel, motor_capacity, power_kw, power_hp, max_mass_camp, bruto_ton,
    EURO_CAT, user_date, user_id, max_posible_mass, isactive
  } = req.body;

  try {
    const client = await pool.connect();
    const insertQuery = `
      INSERT INTO vehicle (
        carmark_id, carmodel_id, transport_id, regno, win, motor_no, reg_year, city,
        axes_number, fuel, motor_capacity, power_kw, power_hp, max_mass_camp, bruto_ton,
        EURO_CAT, user_date, user_id, max_posible_mass, isactive
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING vehicle_id
    `;
    const values = [
      carmark_id, carmodel_id, transport_id, regno, win, motor_no, reg_year, city,
      axes_number, fuel, motor_capacity, power_kw, power_hp, max_mass_camp, bruto_ton,
      EURO_CAT, user_date, user_id, max_posible_mass, isactive
    ];
    const result = await client.query(insertQuery, values);
    client.release();
    res.status(201).json({ vehicle_id: result.rows[0].vehicle_id });
  } catch (error) {
    console.error('Error inserting vehicle data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});