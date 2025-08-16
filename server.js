const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// URL-ul de conectare la MongoDB Atlas.
const dbURI = 'mongodb+srv://grigoreanalexandru40:alexcneh2021@cluster0.q3ciumb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectat la MongoDB!'))
  .catch(err => console.error('Eroare de conectare la baza de date:', err));

// Schema pentru utilizatori
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // Asta asigură că nu există doi utilizatori cu același username
  },
  password: {
    type: String,
    required: true
  }
});

// Modelul este clasa cu care vei interacționa în baza de date
const User = mongoose.model('User', userSchema);

// Middleware-uri
app.use(express.static(path.join(__dirname, '')));
app.use(express.json()); // Important pentru a primi datele JSON din cereri

// Rută pentru înregistrare
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send('User registered successfully!');
  } catch (error) {
    res.status(400).send('Registration failed: ' + error.message);
  }
});

// Rută pentru login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).send('Login successful!');
    } else {
      res.status(401).send('Invalid username or password.');
    }
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
});

// Pornirea serverului
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
