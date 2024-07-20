require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_CONTENT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'bearexpo360.appspot.com'
});

const firestore = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { firestore, bucket };
