const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        'Road damage / pothole',
        'Streetlight',
        'Blocked drain',
        'Water leakage',
        'Waste management',
        'Public facility',
        'Other',
      ],
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },

    location: {
      address: {
        type: String,
        required: true,
        maxlength: 300,
      },

      latitude: {
        type: Number,
        min: -90,
        max: 90,
      },

      longitude: {
        type: Number,
        min: -180,
        max: 180,
      },
    },

    photoUrl: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: [
        'Submitted',
        'Under Review',
        'In Progress',
        'Resolved',
        'Rejected',
      ],
      default: 'Submitted',
    },

    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Complaint', complaintSchema)