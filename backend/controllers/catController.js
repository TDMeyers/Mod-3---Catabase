const Users = require('../models/userModel')

module.exports.index = async (req, res) => {
    try {
        const posts = await Posts.find().sort({ createdAt: 1 })
        res.status(200).json(posts)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

