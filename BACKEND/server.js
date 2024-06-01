const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8070;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGODB_URL, {})
  .then(() => {
    console.log('Mongodb Connection Successful');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongodb Connection Successful');
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  category: String,
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  const { name, email, password, category } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, category });
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Error signing up. Please try again.' });
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'success', category: user.category });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Error signing in. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
