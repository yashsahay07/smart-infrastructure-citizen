
const multer = require('multer')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ]

    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('Only JPG, PNG, and WebP images are allowed.'))
    }
  },
})

module.exports = upload

