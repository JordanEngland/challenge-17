const router = require('express').Router();
const { User } = require('../../models');

// GET all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
