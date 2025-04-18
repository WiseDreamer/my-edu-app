// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { db } = require('../firebase/firebase');

// Endpoint to register a user in Firestore
router.post('/register', async (req, res) => {
  const { uid, name, email, password, modules } = req.body;
  try {
    // For demo purposes, password is stored here.
    // In production, use Firebase Authentication for secure password handling.
    await db.collection('users').doc(uid).set({ name, email, password, modules });
    res.status(200).send('User registered successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Endpoint to get user-specific modules
router.get('/dashboard', async (req, res) => {
  const uid = req.query.uid;
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.exists) {
      res.status(200).json({ modules: userDoc.data().modules });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;


