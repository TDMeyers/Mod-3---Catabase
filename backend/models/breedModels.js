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
    givenName: { type: String,
    required: false
    },
    givenAge: { type: Number, 
    required: false
    },
})

const Breeds = mongoose.model('breeds', breedSchema)

module.exports = Breeds