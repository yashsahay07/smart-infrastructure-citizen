
const cloudinary = require('../config/cloudinary')
const { Readable } = require('stream')

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'smart-citizen-complaints',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )

    Readable.from(file.buffer).pipe(uploadStream)
  })
}

module.exports = uploadToCloudinary
