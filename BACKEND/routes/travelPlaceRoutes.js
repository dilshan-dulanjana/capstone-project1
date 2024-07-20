const express = require("express");
const router = express.Router();
const TravelPlace = require("../models/TravelPlace");
const requesttravelPlaces = require("../models/requesttravelPlaces");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Rating = require("../models/ratingsModel");
const cloudinary = require("cloudinary").v2; // Import Cloudinary SDK
const mongoose = require('mongoose');

// Route to search travel places

// Get travel place by name
router.get("/by-name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const travelPlace = await TravelPlace.findOne({ locationName: name });
    if (travelPlace) {
      res.status(200).json(travelPlace);
    } else {
      res.status(404).json({ error: "Travel place not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to add or update a trip
router.post("/add-update-trip", auth, async (req, res) => {
  try {
    const {
      search,
      beforeYouGo,
      packingEssentials,
      duringYourVisit,
      afterYourVisit,
      travelPlaceId,
    } = req.body;

    const travelPlace = await TravelPlace.findById(travelPlaceId);
    if (!travelPlace) {
      return res.status(404).json({ message: "Travel place not found" });
    }

    let trip = await Trip.findOneAndUpdate(
      { travelPlace: travelPlaceId },
      {
        search,
        beforeYouGo,
        packingEssentials,
        duringYourVisit,
        afterYourVisit,
        travelPlace: travelPlaceId,
      },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Trip added/updated successfully", trip });
  } catch (error) {
    console.error("Error adding/updating trip:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Configure Cloudinary (Make sure to set your credentials)
cloudinary.config({
  cloud_name: "dxe12sxtl",
  api_key: "743471555633272",
  api_secret: "Cx1MvSOTJVgKA0TE-yesc1pS9us",
});

// Route to add a new travel place
router.post("/add-travel-place", async (req, res) => {
  try {
    const {
      locationName,
      category,
      province,
      District,
      latitude,
      longitude,
      description,
      userName,
      imageurl,
    } = req.body;

    // Create a new TravelPlace instance
    const newTravelPlace = new requesttravelPlaces({
      locationName,
      category,
      province,
      District,
      latitude,
      longitude,
      description,
      userName,
      imageurl,
    });

    // Save the TravelPlace to the database
    await newTravelPlace.save();

    res.status(201).json(newTravelPlace);
  } catch (error) {
    console.error("Error adding travel place:", error);
    res.status(500).json({ message: "Failed to add travel place." });
  }
});



// Route to get all travel places from requesttravelPlaces
router.get("/all", async (req, res) => {
  try {
    const travelPlaces = await requesttravelPlaces.find({});
    res.json(travelPlaces);
  } catch (error) {
    console.error("Error fetching travel places:", error);
    res.status(500).send("Server Error");
  }
});

////////////////////////////////////////////////////////////////

router.post('/approve/:id', async (req, res) => {
  try {
    console.log(`Approve request received for ID: ${req.params.id}`);
    const requestPlace = await requesttravelPlaces.findById(req.params.id);
    if (!requestPlace) {
      console.error(`Request not found: ID ${req.params.id}`);
      return res.status(404).send({ message: 'Request not found' });
    }

    const place = new TravelPlace(requestPlace.toObject());
    await place.save();
    await requesttravelPlaces.findByIdAndDelete(req.params.id);

    let user = await User.findOne({ name: requestPlace.userName });
    if (!user) {
      console.log(`Creating new user with username: ${requestPlace.userName}`);
      user = new User({
        name: requestPlace.userName,
        totalPoints: 10, // Assign initial points
        userID: requestPlace.userID // Ensure this field is set if it's required
      });
      await user.save();
    } else {
      console.log(`Found existing user with ID: ${user._id}, updating points.`);
      user.totalPoints += 10;
      user.userID = user.userID || requestPlace.userID; // Ensure userID is set
      await user.save();
    }

    let rating = await Rating.findOne({ userid: user._id });
    if (!rating) {
      console.log(`Creating new rating for user ID: ${user._id}`);
      rating = new Rating({ 
        userId: user.userID,
        userid:new mongoose.Types.ObjectId(user._id),
        name: user.name,
        totalPoints: user.totalPoints,
        rank: 0,
      });
    } else {
      console.log(`Updating existing rating for user ID: ${user._id}`);
      rating.totalPoints = user.totalPoints;  
    }

    await rating.save();

    const allRatings = await Rating.find().sort({ totalPoints: -1 });
    for (let i = 0; i < allRatings.length; i++) {
      allRatings[i].rank = i + 1;
      await allRatings[i].save();
    }

    console.log(`Place approved successfully for ID: ${req.params.id}`);
    res.status(200).send({ message: 'Place approved successfully', place, user, rating });
  } catch (error) {
    console.error(`Error approving the place: ${error.message}`, error);
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});
router.delete('/delete/:id', async (req, res) => {
  try {
    await requesttravelPlaces.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Place request deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const travelPlaces = await TravelPlace.find();
    res.status(200).send(travelPlaces);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Errorccccccc', error: error.message });
  }
});

router.get('/ratings', async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ rank: 1 });
    res.status(200).send(ratings);
  } catch (error) {
    console.error(`Error fetching ratings: ${error.message}`, error);
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});










////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/ratings', async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ rank: 1 });
    res.status(200).send(ratings);
  } catch (error) {
    console.error(`Error fetching ratings: ${error.message}`, error);
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});



router.delete('/delete/:id', async (req, res) => {
  try {
    await requesttravelPlaces.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Place request deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});


// Search travel place by name
router.get("/search", async (req, res) => {
  try {
    const name = req.query.name.toLowerCase(); // Normalize the search query to lowercase
    const travelPlace = await TravelPlace.findOne({
      locationName: { $regex: new RegExp(`^${name}$`, "i") },
    }); // Case-insensitive regex search

    if (!travelPlace) {
      return res.status(404).json({ message: "Travel place not found" });
    }

    res.json(travelPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update travel place
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTravelPlace = await TravelPlace.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (updatedTravelPlace) {
      res.json({
        message: "Travel Place updated successfully",
        updatedTravelPlace,
      });
    } else {
      res.status(404).json({ message: "Travel Place not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating travel place", error });
  }
});

// Delete travel place by system
router.delete("/deletes/:id", async (req, res) => {
  try {
    const requestPlace = await TravelPlace.findById(req.params.id);
    if (!requestPlace) {
      console.error(`Request not found: ID ${req.params.id}`);
      return res.status(404).send({ message: "Request not found" });
    }

    await TravelPlace.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Request deleted successfully" });
  } catch (error) {
    console.error(`Error deleting the place request: ${error.message}`, error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

// GET travel places by category
router.get('/api/travel-places', async (req, res) => {
  try {
    const category = req.query.category;
    const travelPlaces = await TravelPlace.find(category ? { category } : {});
    res.status(200).json(travelPlaces);
  } catch (error) {
    console.error('Error fetching travel places:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get a single travel place by ID (assuming this route exists)
router.get("/travelplace/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await TravelPlace.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the travel place" });
  }
});

// Route to get additional data by location name
router.get("/other-data", async (req, res) => {
  try {
    const locationName = req.query.locationName;
    const data = await TravelPlace.find({ locationName });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data" });
  }
});

// Route to get related travel places by province, excluding the current travel place
router.get("/related-places/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const currentPlace = await TravelPlace.findById(id);

    if (!currentPlace) {
      return res.status(404).json({ error: "Travel place not found" });
    }

    const relatedPlaces = await TravelPlace.find({
      province: currentPlace.province,
      _id: { $ne: id }, // Exclude the current place
    });

    res.status(200).json(relatedPlaces);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while fetching related travel places",
      });
  }
});


// Route to fetch a single travel place by ID
router.get("/:id", getTravelPlace, (req, res) => {
  res.json(res.travelPlace);
});

// Middleware to get a single travel place by ID
async function getTravelPlace(req, res, next) {
  try {
    const travelPlace = await TravelPlace.findById(req.params.id);
    if (travelPlace == null) {
      return res.status(404).json({ message: "Cannot find travel place" });
    }
    res.travelPlace = travelPlace;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Route to get travel place suggestions

router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const places = await TravelPlace.find({
      locationName: { $regex: query, $options: "i" }, // 'i' for case-insensitive search
    });
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const travelPlace = new TravelPlace(req.body);
    await travelPlace.save();
    res.status(201).send(travelPlace);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all travel places by category
router.get('/', async (req, res) => {
  try {
      const category = req.query.category;
      const travelPlaces = await TravelPlace.find({ category });
      res.json(travelPlaces);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;
