const router = require('express').Router();
const { Thought, reactionSchema } = require('../models');


// POST to create a reaction stored in a single thought's reactions array field
router.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    thought.reactions.push(req.body);
    const updatedThought = await thought.save();

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    const reactionIdToDelete = req.params.reactionId;
    thought.reactions = thought.reactions.filter(
      (reaction) => reaction.reactionId.toString() !== reactionIdToDelete
    );

    const updatedThought = await thought.save();
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
