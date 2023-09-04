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
