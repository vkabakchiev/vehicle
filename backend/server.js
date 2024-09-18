require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Pool } = require('pg');
const session = require('express-session');

const app = express();
const port = 3001; // Ensure this matches the port your backend is running on

// Configure the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Заменете с URL на вашия фронтенд
  credentials: true
}));

// Configure session middleware
app.use(session({
  secret: '102501roMeo1064ROMeo8001252845Wisky', // Заменете с вашата тайна ключова дума
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // За development, използвайте secure: true за production с HTTPS
}));

// Registration route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const client = await pool.connect();
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await client.query(userQuery, [email]);

    if (userResult.rows.length > 0) {
      client.release();
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING user_id'; // Ensure this matches your primary key column
    const result = await client.query(insertQuery, [name, email, hashedPassword]);

    client.release();
    res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].user_id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Vehicle route
app.post('/vehicles', async (req, res) => {
  const {
    carmark, carmodel, regno, win, motor_no, reg_year, city,
    axes_number, fuel, motor_capacity, power_kw, power_hp, max_mass_camp, bruto_ton,
    EURO_CAT, max_posible_mass, isactive
  } = req.body;

  try {
    const client = await pool.connect();
    const insertQuery = `
      INSERT INTO vehicle (
        carmark, carmodel, regno, win, motor_no, reg_year, city,
        axes_number, fuel, motor_capacity, power_kw, power_hp, max_mass_camp, bruto_ton,
        EURO_CAT, max_posible_mass, isactive
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING vehicle_id
    `;
    const values = [
      carmark, carmodel, regno, win, motor_no, reg_year, city,
      axes_number, fuel, motor_capacity, power_kw, power_hp, max_mass_camp, bruto_ton,
      EURO_CAT, max_posible_mass, isactive
    ];
    const result = await client.query(insertQuery, values);
    client.release();
    res.status(201).json({ vehicle_id: result.rows[0].vehicle_id });
  } catch (error) {
    console.error('Error inserting vehicle data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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

    // Съхранете user_id в сесията
    req.session.userId = user.user_id;

    client.release();
    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Vehicle list route
app.get('/vehicles', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM vehicle');
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Vehicle details route
app.get('/vehicles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM vehicle WHERE vehicle_id = $1', [id]);
    client.release();
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Маршрут за добавяне на нов запис в таблицата items
app.post('/items', async (req, res) => {
  const { date_from, date_to, probeg, opisaninie, item, stoinost } = req.body;
  const user_id = req.session.userId; // Използвайте user_id от сесията
  const vehicle_id = req.body.vehicle_id;

  if (!user_id) {
    return res.status(401).json({ message: 'User not logged in' });
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO items (user_id, vehicle_id, date_from, date_to, probeg, opisaninie, item, stoinost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [user_id, vehicle_id, date_from, date_to, probeg, opisaninie, item, stoinost]
    );
    client.release();
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});