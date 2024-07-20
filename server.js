const express = require('express');
const cors = require('cors');
const path = require('path');
const { firestore, bucket } = require('./firebase');
const app = express();
const port = 3000;
const allowedOrigins = ['http://3.112.221.212:3000', 'http://localhost:3000'];
app.use(cors({
    origin: 'http://3.112.221.212:3000'
}));
app.use(express.static('public'));

// Route to get slider images
app.get('/slider/:userId/:product', async (req, res) => {
    const userId = req.params.userId;
    const productName = req.params.product;

    try {
        const docRef = firestore.collection('images').doc(userId);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).send('No images found for this user.');
        }

        const data = doc.data();
        const productImages = data[productName];

        if (!productImages) {
            return res.status(404).send('No images found for this product.');
        }

        const imageUrls = await Promise.all(
            productImages.map(async (image) => {
                const file = bucket.file(`images/${userId}/${image.fileName}`);
                const [url] = await file.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2500'
                });
                return { url, ...image };
            })
        );
        res.json(imageUrls);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to serve the slider page
app.get('/sliderPage/:userId/:product', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'slider.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
