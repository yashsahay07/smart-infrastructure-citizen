
const express = require('express')
const crypto = require('crypto')
const Complaint = require('../models/Complaint')
const upload = require('../middleware/upload')
const uploadToCloudinary = require('../utils/uploadToCloudinary')

const router = express.Router()

// Register a new complaint
router.post('/', (req, res, next) => {
  upload.single('photo')(req, res, (error) => {
    if (error) {
      const statusCode =
        error.code === 'LIMIT_FILE_SIZE' ||
        error.code === 'LIMIT_FILE_COUNT'
          ? 400
          : 400

      return res.status(statusCode).json({
        message: error.message || 'Unable to process the uploaded photo.',
      })
    }

    next()
  })
}, async (req, res) => {
  try {
    const { category, description, location, latitude, longitude } = req.body

    if (
      typeof category !== 'string' ||
      typeof description !== 'string' ||
      typeof location !== 'string'
    ) {
      return res.status(400).json({
        message: 'Please provide a category, description, and location.',
      })
    }

    const cleanDescription = description.trim()
    const cleanLocation = location.trim()

    const validCategories = [
      'Road damage / pothole',
      'Streetlight',
      'Blocked drain',
      'Water leakage',
      'Waste management',
      'Public facility',
      'Other',
    ]

    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid issue category.' })
    }

    if (cleanDescription.length < 10 || cleanDescription.length > 2000) {
      return res.status(400).json({
        message: 'Description must be between 10 and 2000 characters.',
      })
    }

    if (!cleanLocation || cleanLocation.length > 300) {
      return res.status(400).json({
        message: 'Please provide a location of up to 300 characters.',
      })
    }

    const complaintId =
      'SC-' + crypto.randomBytes(5).toString('hex').toUpperCase()
      let photoUrl = ''

if (req.file) {
  const uploadedPhoto = await uploadToCloudinary(req.file)
  photoUrl = uploadedPhoto.secure_url
}

   const complaint = await Complaint.create({
  complaintId,
  category,
  description: cleanDescription,
  location: {
    address: cleanLocation,
    ...(latitude !== undefined &&
    latitude !== '' &&
    longitude !== undefined &&
    longitude !== ''
      ? {
         ...(latitude !== undefined &&
latitude !== '' &&
longitude !== undefined &&
longitude !== '' &&
Number.isFinite(Number(latitude)) &&
Number.isFinite(Number(longitude)) &&
Number(latitude) >= -90 &&
Number(latitude) <= 90 &&
Number(longitude) >= -180 &&
Number(longitude) <= 180
  ? {
      latitude: Number(latitude),
      longitude: Number(longitude),
    }
  : {}),
        }
      : {}),
  },
  photoUrl,
})
    return res.status(201).json({
  message: 'Complaint registered successfully.',
  complaint: {
    complaintId: complaint.complaintId,
    category: complaint.category,
    description: complaint.description,
    location: complaint.location.address,
    latitude: complaint.location.latitude ?? null,
    longitude: complaint.location.longitude ?? null,
    photoUrl: complaint.photoUrl,
    status: complaint.status,
    priority: complaint.priority,
    createdAt: complaint.createdAt,
  },
})
  } catch (error) {
    console.error('Complaint registration failed:', error.message )
    return res.status(500).json({
      message: 'Unable to register complaint right now. Please try again.',
    })
  }
})
// Track a complaint using its unique complaint ID
router.get('/:complaintId', async (req, res) => {
  try {
    const complaintId = req.params.complaintId.trim().toUpperCase()

    const complaint = await Complaint.findOne({ complaintId })

    if (!complaint) {
      return res.status(404).json({
        message: 'No complaint found with this ID.',
      })
    }

    return res.status(200).json({
      complaint: {
        complaintId: complaint.complaintId,
        category: complaint.category,
        description: complaint.description,
        location: complaint.location.address,
        status: complaint.status,
        priority: complaint.priority,
        photoUrl: complaint.photoUrl,
        createdAt: complaint.createdAt,
        updatedAt: complaint.updatedAt,
      },
    })
  } catch (error) {
    console.error('Complaint tracking failed:', error.message)

    return res.status(500).json({
      message: 'Unable to track complaint right now. Please try again.',
    })
  }
})

module.exports = router