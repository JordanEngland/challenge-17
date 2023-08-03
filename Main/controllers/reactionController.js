const { Thought } = require('../models');

const ReactionController = {
  // Controller function to add a new reaction to a thought's reactions array field
  addReaction: async (req, res) => {
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
  },

  // Controller function to remove a reaction from a thought's reactions array field
  removeReaction: async (req, res) => {
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
  },
};

module.exports = ReactionController;
