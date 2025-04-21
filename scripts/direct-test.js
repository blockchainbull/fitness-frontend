// scripts/direct-test.js
const { Client } = require('pg');

async function main() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'fitness_ai',
    password: "xBq(tb'xNG",
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');
    const res = await client.query('SELECT NOW()');
    console.log('Current time from PostgreSQL:', res.rows[0]);
  } catch (error) {
    console.error('Connection error:', error.message);
  } finally {
    await client.end();
  }
}

main();