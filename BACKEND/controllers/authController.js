const User = require('../models/userModel');
const Counter = require('../models/counterModel');
const TravelPlace = require('../models/travelPlaceModel'); // Add the TravelPlace model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const Adminuser= require('../models/AdminModel');
const secretKey = "This is best tourisum Site in Sri";



const getNextSequence = async (name) => {
  const counter = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};

exports.adminsignup = async (req, res) => {
  const { name, email, password, category } = req.body;
  try {
    const existingUser = await Adminuser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userID = await getNextSequence('userID'); // Get the next user ID
    const newUser = new Adminuser({ name, email, password: hashedPassword, category, userID });
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Error signing up. Please try again.' });
  }
};













exports.signup = async (req, res) => {
  const { name, email, password, category } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userID = await getNextSequence('userID'); // Get the next user ID
    const newUser = new User({ name, email, password: hashedPassword, category, userID });
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Error signing up. Please try again.' });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Signin attempt with email:', email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User found:', user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match for user:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('Password matched for user:', email);
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Use _id from MongoDB
      secretKey,
      { expiresIn: '1h' }
    );

    console.log('Token generated:', token);
    res.status(200).json({ message: 'success', token, category: user.category });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Error signing in. Please try again.' });
  }
};

// Initialize the counter if it doesn't exist
const initializeCounter = async () => {
  try {
    const counter = await Counter.findById('userID');
    if (!counter) {
      await new Counter({ _id: 'userID', seq: 0 }).save();
    }
  } catch (error) {
    console.error('Error initializing counter:', error);
  }
};

// Call this function during server initialization
initializeCounter();

// Add the new addTravelPlace function
exports.addTravelPlace = async (req, res) => {
  try {
    const { locationName, category, username, province, city, state, zip, terms, latitude, longitude, userId } = req.body;

    // Upload images to Cloudinary
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) {
            reject('Error uploading image: ' + error.message);
          } else {
            resolve(result.secure_url);
          }
        }).end(file.buffer);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

    const newTravelPlace = new TravelPlace({
      locationName,
      category,
      username,
      province,
      city,
      state,
      zip,
      terms,
      images: imageUrls,
      latitude,
      longitude,
      userId: mongoose.Types.ObjectId(userId) // Ensure userId is an ObjectId
    });

    await newTravelPlace.save();

    res.status(201).json({ message: 'Travel place added successfully!' });
  } catch (error) {
    console.error('Error adding travel place:', error);
    res.status(500).json({ message: 'Error adding travel place. Please try again.' });
  }
};
