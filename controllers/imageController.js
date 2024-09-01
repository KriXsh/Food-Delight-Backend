const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Upload an image for a dish
exports.uploadDishImage = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(500).json({code: 401, error: 'Error uploading image' });
        }
        res.status(200).json({ code:200, message: 'Image uploaded successfully', filePath: req.file.path });
    });
};
