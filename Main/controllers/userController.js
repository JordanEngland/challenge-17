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

module.exports = UserController;
