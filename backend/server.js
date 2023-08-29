// Import and require dotenv
require('dotenv').config()

// Import and require Express
const express = require('express')

// Import and require CORS
const cors = require('cors')

// Setup Express and port
const app = express()

const PORT = 8080

// Import and require connectDB
const connectDB = require('./config')

// Connect to the database
connectDB()



const { authorize } = require('./middleware/authMiddleware')

app.use(express.json())
app.use(cors())



// Listen to the configured port
app.listen(PORT, () => {
    console.log('Listening to PORT: ' + PORT)
})