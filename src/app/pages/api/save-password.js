import { openDB } from '../../lib/db';
import crypto from 'crypto';
import { verifyToken } from '../../lib/jwt';

const ENCRYPTION_KEY = crypto.randomBytes(32);
const IV_LENGTH = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { token } = req.headers;
  const payload = verifyToken(token);
  if (!payload) return res.status(403).json({ message: 'Invalid token' });

  const { service, password } = req.body;
  const encryptedPassword = encrypt(password);
  const db = await openDB();
  await db.run(
    'CREATE TABLE IF NOT EXISTS passwords (id INTEGER PRIMARY KEY AUTOINCREMENT, user_email TEXT, service TEXT, encrypted_password TEXT)'
  );
  await db.run(
    'INSERT INTO passwords (user_email, service, encrypted_password) VALUES (?, ?, ?)',
    [payload.email, service, encryptedPassword]
  );
  res.status(200).json({ message: 'Password stored securely' });
}
