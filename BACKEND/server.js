const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const travelPlaceRoutes = require('./routes/travelPlaceRoutes');
 const tripRouter = require('./routes/tripRoutes');
 const tripRoutes = require('./routes/tripRoutes');
 const travelPlaceRoute = require('./routes/travelPlaces');
const updateTripRoutes = require('./routes/updateTrip'); // Include the new route file
const travelPlacesRoutes = require('./routes/travelPlaces');
const tourguideRoutes = require('./routes/tourguideRoutes');
const travelagentRoutes = require('./routes/travelagentRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const accommodationRoutes = require('./routes/accomdationRoutes');
const accomadationRouts1 = require('./routes/accomadationRoutes1');
const  travelplaceroutes1 = require('./routes/travelplaceRoutes1'); 

const AdminRouts = require('./routes/AdminRoutes.js');
//const RequestTravelPlaces = require('./routes/RequestTravelPlaces');
dotenv.config();

const PORT = process.env.PORT || 8070;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Set security HTTP headers
app.use(helmet());

// Parse JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON');
    return res.status(400).send({ message: 'Invalid JSON' });
  }
  next();
});

// Connect to MongoDB
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connection Successful');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit process with failure
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/travelplaces', travelPlaceRoutes);
app.use('/api/travel-places', travelPlaceRoutes);
//app.use('/api/requestTravelplace',RequestTravelPlaces );
 app.use('/trips', tripRouter);
 app.use('/travelplaces', travelPlaceRoute);
app.use('/trips', updateTripRoutes); // Use the new route file


app.use('/api/travel-places/all', travelPlacesRoutes);
const ratingsRouter = require('./routes/ratings');
app.use('/api/travelers', ratingsRouter);

app.use('/travelplaces', travelPlaceRoutes);

app.use('/api/travelplaces', travelPlaceRoutes);
app.use('/api/tourguides', tourguideRoutes);
app.use('/api/travelagent', travelagentRoutes);;

app.use('/api2', travelPlaceRoutes);
app.use('/api/travelplaces', travelPlaceRoutes);
app.use('/api/travelplaces', travelPlaceRoutes); 
app.use('/api/trips', tripRoutes);
app.use('/api/travelplaces', travelPlaceRoutes);
app.use('/api/trips', tripRoutes);
app.use('/', travelPlaceRoutes);
app.use('/api/travel-places', travelPlaceRoutes);
app.use('/api/travel-places', travelPlaceRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api1', accommodationRoutes);

app.use('/api/accommodation', accommodationRoutes);
0
app.use('/api/accommodations',accomadationRouts1);
app.use('/api/accommodations', accomadationRouts1);
// Routes
app.use('/accommodation', accomadationRouts1);
app.use('/travelplace123', accomadationRouts1);
app.use('/api/travelplaces23', travelplaceroutes1);
app.use('/api555', tripRoutes);
app.use('/', travelplaceroutes1);
app.use(travelplaceroutes1);
app.use('/', accomadationRouts1);

app.use('/api',AdminRouts);

const packingListRoutes = require('./routes/packingListRoutes');
app.use('/api/packinglists', packingListRoutes);
app.use('/api/packinglists', packingListRoutes);

0
// Start the server
app.listen(PORT, () => { 
  console.log(`Server is up and running on port number: ${PORT}`);
});
