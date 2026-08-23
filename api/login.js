module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password required' });
  }

  if (email === 'student@gmail.com' && password === 'student123') {
    return res.status(200).json({ success: true, msg: 'Login successful', email });
  }

  return res.status(401).json({ msg: 'Invalid email or password' });
};
