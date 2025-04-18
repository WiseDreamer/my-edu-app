// backend/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../my-edu-app-16447-firebase-adminsdk-fbsvc-67430aa10d.json');
                                 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-edu-app-16447.firebaseio.com" // update if necessary
});

const db = admin.firestore();

module.exports = { admin, db };



