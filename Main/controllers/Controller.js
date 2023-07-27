const { User, Thought } = require('../models');

// UserController
const UserController = {
  // Controller function to get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Controller function to get a single user by its _id and populated thought and friend data
  getSingleUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Controller function to create a new user
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Controller function to update a user by its _id
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Controller function to remove user by its _id
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      // Remove the user's associated thoughts when deleted
      await Thought.deleteMany({ username: req.params.userId });

      // Remove the user from the friends' friend lists
      await User.updateMany({}, { $pull: { friends: req.params.userId } });

      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Controller function to add a new friend to a user's friend list
  addFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.friends.push(req.params.friendId);
      await user.save();

      res.json({ message: 'Friend added' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Controller function to remove a friend from a user's friend list
  removeFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.friends.pull(req.params.friendId);
      await user.save();

      res.json({ message: 'Friend removed' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

// ThoughtController
const ThoughtController = {
  // Controller function to get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Controller function to get a single thought by its _id
  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Controller function to create a new thought
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);

      // Add the created thought's _id to the associated user's thoughts array field
      const user = await User.findById(thought.username);
      user.thoughts.push(thought._id);
      await user.save();

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Controller function to update a thought by its _id
  updateThought: async (req, res) => {
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
  },

  // Controller function to remove a thought by its _id
  deleteThought: async (req, res) => {
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
  },
};

module.exports = { UserController, ThoughtController };
