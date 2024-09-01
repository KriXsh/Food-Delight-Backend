const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const processAndSaveImage = async (imageBuffer, filename) => {
    const filePath = path.join(uploadDir, filename);
    try {
        await sharp(imageBuffer)
            .resize(500) // Resize the image to a width of 500px
            .toFile(filePath);
        return filePath;
    } catch (error) {
        console.error('Error processing image:', error);
        throw new Error('Image processing failed');
    }
};

module.exports = { processAndSaveImage };
