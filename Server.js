const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Registration route remains the same...
// app.post('/register', async (req, res) => { ... })

// Optional: serve registration form as homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/registration.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
