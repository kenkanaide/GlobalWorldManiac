const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Updated MongoDB connection code without deprecated options
mongoose.connect('mongodb://127.0.0.1:27017/registrationDB')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection failed', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // For serving static files

// Schema & Model
const registrationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  address: String,
  paymentMethod: String
});
const Registration = mongoose.model('Registration', registrationSchema);

// POST route
app.post('/register', async (req, res) => {
  const { fullName, email, phone, address } = req.body;
  const paymentMethod = req.body['payment-method'];

  if (!fullName || !email || !phone || !address || !paymentMethod) {
    return res.json({ success: false, message: 'All fields are required.' });
  }

  const namePattern = /^[A-Za-z\s]+$/;
  const phonePattern = /^[0-9]+$/;

  if (!namePattern.test(fullName)) {
    return res.json({ success: false, message: 'Invalid name format.' });
  }

  if (!phonePattern.test(phone)) {
    return res.json({ success: false, message: 'Invalid phone number.' });
  }

  try {
    const newUser = new Registration({
      fullName,
      email,
      phone,
      address,
      paymentMethod
    });

    await newUser.save();
    res.json({ success: true, message: 'Registration successful!' });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
