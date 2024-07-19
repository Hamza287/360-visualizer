const admin = require('firebase-admin');
const serviceAccount = require('./bearexpo360-firebase-adminsdk-jd2yh-0573424e4b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'bearexpo360.appspot.com' // e.g., 'my-app.appspot.com'
});

const firestore = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { firestore, bucket };
