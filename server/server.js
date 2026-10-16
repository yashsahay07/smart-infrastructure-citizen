
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const complaintRoutes = require('./routes/complaints')



const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/complaints', complaintRoutes)
app.get('/api/test', (req, res) => {
  res.json({ message: 'API test route works!' })
})

app.get('/', (req, res) => {
  res.json({
    message: 'Smart Citizen API is running!',
    status: 'success',
  })
})

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from server/.env')
    }

    await mongoose.connect(process.env.MONGODB_URI)

    console.log('MongoDB Atlas connected successfully!')

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Startup failed:', error.message)
    process.exit(1)
  }
}

startServer()