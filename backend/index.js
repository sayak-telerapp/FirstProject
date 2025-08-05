
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


const pool = new Pool({
  user: 'postgres',           
  host: 'localhost',
  database: 'postgres',        
  password: 'Sayakdas@1234',   
  port: 5432,
});


app.get('/users', async (req, res) => {
  try {
    console.log('Fetching data from "user" table...');
    const result = await pool.query('SELECT * FROM "user"');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).send('Database error');
  }
});


app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1');
    res.json(result.rows);
  } catch (err) {
    console.error('Simple query error:', err.message);
    res.status(500).send('Simple DB error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});