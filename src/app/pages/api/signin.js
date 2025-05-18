import { openDB } from '../../lib/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../lib/jwt';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  const db = await openDB();
  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateToken(user);
    res.status(200).json({ token, user: { email: user.email } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
