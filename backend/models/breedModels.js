//Set Schema with Mongoose

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const breedSchema = new Schema ({
    breed: { type: String,
    required: true
},
    name: {type: String,
    required: true
    },
    user: { type: String,
    required: true
},
})

const Breeds = mongoose.model('breeds', breedSchema)

module.exports = Breeds