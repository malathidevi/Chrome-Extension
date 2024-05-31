const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');

router.post('/profile', async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
