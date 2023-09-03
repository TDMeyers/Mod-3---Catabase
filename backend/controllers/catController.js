const Users = require("../models/userModel");
const Breeds = require("../models/breedModels");

module.exports.index = async (req, res) => {
  try {
    const breeds = await Breeds.find().sort({ createdAt: 1 });
    res.status(200).json(breeds);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports.create = async (req, res) => {
  console.log(req.body);
  try {
    // Get the breed ID from the request body
    const { breedID } = req.body;

    // create a new favorited breed document
    const newBreed = new Breeds({
      breed: breedID,
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
