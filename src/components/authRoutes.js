// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { admin } = require('../firebase');

// Endpoint to "send" OTP (for demo purposes, we create a user and return its uid as a verificationId)
router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ phoneNumber });
    res.status(200).send({ verificationId: userRecord.uid });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Endpoint to "verify" OTP (demo version; actual OTP verification should be done via Firebase client SDK)
router.post('/verify-otp', async (req, res) => {
  const { verificationId, otp } = req.body;
  try {
    const user = await admin.auth().verifyIdToken(verificationId);
    res.status(200).send({ uid: user.uid });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
