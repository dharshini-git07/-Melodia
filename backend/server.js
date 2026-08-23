const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password required' });
  }

  if (email === 'student@gmail.com' && password === 'student123') {
    return res.status(200).json({ success: true, msg: 'Login successful', email });
  }

  return res.status(401).json({ msg: 'Invalid email or password' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
