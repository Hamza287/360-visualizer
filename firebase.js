const admin = require('firebase-admin');
const serviceAccount = require('./bearexpo360-e7c14746e175.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'bearexpo360.appspot.com'
});

const firestore = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { firestore, bucket };
