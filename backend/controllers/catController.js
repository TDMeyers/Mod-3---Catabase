const Users = require("../models/userModel");
const Breeds = require("../models/breedModels");

module.exports.index = async (req, res) => {
  const userId = req.username;
  console.log(req, req.username);
  try {
    const breeds = await Breeds.find({ user: userId }).sort({ createdAt: 1 });
    res.status(200).json(breeds);
    console.log(breeds);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports.create = async (req, res) => {
  console.log(req.body);
  try {
    // Get the breed ID and breed name from the request body
    const { id, name } = req.body;

    // create a new favorited breed document
    const newBreed = new Breeds({
      breed: id,
      name: name,
      user: req.username,
    });

    // Save the favorited breed to the database
    await newBreed.save();

    res.status(201).json({ message: "Breed saved successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Breeds.findOneAndDelete({ id: req.params._id, user: req.username });

    res.status(200).json({ message: "successfully removed" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports.update = async (req, res) => {
  try {
    

    const { favId } = req.params; // Extract favId from params
    const { givenName, givenAge } = req.body; // Extract data from the request body

    console.log(favId, givenAge, givenName);
    // Check if the breed with the provided ID exists
    let breed = await Breeds.findOne(
      { _id: favId, user: req.username }
    );

    if (!breed) {
      return res.status(404).json({ message: "Breed not found" });
    }

    // Update the breed properties if provided
    if (givenName) {
      breed.givenName = givenName;
    }

    if (givenAge) {
      breed.givenAge = givenAge;
    }

    // Save the updated breed
    breed = await breed.save();

    res.status(200).json(breed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
