const router = require('express').Router();
const { Thought, User } = require('../models');


// GET all thoughts
router.get('/api/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought by its _id
router.get('/api/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a new thought
router.post('/api/thoughts', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    // Add the created thought's _id to the associated user's thoughts array
    const user = await User.findById(thought.username);
    user.thoughts.push(thought._id);
    await user.save();

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a thought by its _id
router.put('/api/thoughts/:thoughtId', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a thought by its _id
router.delete('/api/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Remove the thought from the associated user's thoughts array
    const user = await User.findById(thought.username);
    user.thoughts.pull(thought._id);
    await user.save();

    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
