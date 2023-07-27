const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const { initialUsers, initialThoughts } = require('./data');

const seedDatabase = async () => {
  try {
    // Clear the existing data from the collections
    await User.deleteMany();
    await Thought.deleteMany();

    // Create new users and thoughts
    const users = await User.create(initialUsers);
    const thoughts = await Thought.create(initialThoughts);

    // Add thoughts to the user's thoughts array
    for (let i = 0; i < users.length; i++) {
      users[i].thoughts.push(thoughts[i]._id);
      await users[i].save();
    }

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding the database:', err);
    process.exit(1); // Exit the process with a non-zero code (failure)
  }
};

// Connect to the database and seed it with initial data
mongoose
  .connect('mongodb://localhost/social_network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    seedDatabase()
      .then(() => {
        // Close the database connection after all seeding operations are completed
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error('Error seeding the database:', err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process with a non-zero code (failure)
  });
