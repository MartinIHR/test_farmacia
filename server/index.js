const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(express.json());

// simple CORS for local development
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

async function getPool(){
  // defaults match docker-compose.yml for easy local dev
  const host = process.env.DB_HOST || '127.0.0.1';
  const user = process.env.DB_USER || 'farm_user';
  const password = process.env.DB_PASS || 'farm_pass';
  const database = process.env.DB_NAME || 'test_farmacia';

  try{
    const pool = await mysql.createPool({
      host,
      user,
      password,
      database,
      // ensure utf8mb4 for proper unicode (accents, emojis)
      charset: 'utf8mb4',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    // enforce connection charset
    try{
      await pool.query("SET NAMES utf8mb4");
    }catch(e){
      console.warn('Could not set connection charset on pool', e);
    }
    return pool;
  }catch(err){
    console.error('Failed to create DB pool. Check DB credentials and that MySQL is running.');
    throw err;
  }
}

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/api/products', async (req, res) => {
  try{
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id, name, price, description, image, requiresPrescription, stockByLocation FROM products LIMIT 50');
    // parse JSON column to object
    const parsed = rows.map(r => ({
      ...r,
      requiresPrescription: Boolean(r.requiresPrescription),
      stockByLocation: typeof r.stockByLocation === 'string' ? JSON.parse(r.stockByLocation) : r.stockByLocation
    }));
    res.json(parsed);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'db error' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log('Server listening on', port));
