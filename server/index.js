const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(express.json());

async function getPool(){
  const pool = await mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'test_farmacia',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  return pool;
}

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/api/products', async (req, res) => {
  try{
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id, name, price FROM products LIMIT 50');
    res.json(rows);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'db error' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log('Server listening on', port));
