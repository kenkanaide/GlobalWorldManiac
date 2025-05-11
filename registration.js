function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission
  
    // Clear any previous error messages
    document.getElementById('name-error').innerText = '';
    document.getElementById('phone-error').innerText = '';
  
    // Collect form data
    const formData = new FormData(document.getElementById('registration-form'));
  
    // Validate form data before sending
    const fullName = formData.get('fullName');
    const phone = formData.get('phone');
    const namePattern = /^[A-Za-z\s]+$/;
    const phonePattern = /^[0-9]+$/;
  
    // Check if name contains only alphabets and spaces
    if (!namePattern.test(fullName)) {
      document.getElementById('name-error').innerText = 'Name should only contain alphabetic characters and spaces.';
      return false;
    }
  
    // Check if phone number contains only digits
    if (!phonePattern.test(phone)) {
      document.getElementById('phone-error').innerText = 'Phone number should only contain digits.';
      return false;
    }
  
    // Send data to the Node.js server
    fetch('http://localhost:3000/register', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Registration successful!');
      } else {
        alert('Error: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to submit registration.');
    });
  }
  const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // To serve static files (CSS, JS)

// POST route to handle registration data
app.post('/register', (req, res) => {
  const { fullName, email, phone, address, 'payment-method': paymentMethod } = req.body;

  // Validate the form data
  if (!fullName || !email || !phone || !address || !paymentMethod) {
    return res.json({ success: false, message: 'All fields are required.' });
  }

  // Further validation checks (e.g., phone number, name)
  const namePattern = /^[A-Za-z\s]+$/;
  if (!namePattern.test(fullName)) {
    return res.json({ success: false, message: 'Name should only contain alphabetic characters and spaces.' });
  }

  const phonePattern = /^[0-9]+$/;
  if (!phonePattern.test(phone)) {
    return res.json({ success: false, message: 'Phone number should only contain digits.' });
  }

  // Process and store the data (e.g., store in database)
  console.log('Form Data:', req.body);

  // Respond with success
  res.json({ success: true, message: 'Registration successful!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
