import { openDB } from '../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  const db = await openDB();
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT)');
    await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(200).json({ message: 'User registered' });
  } catch (e) {
    res.status(500).json({ error: 'User already exists or DB error' });
  }
}
