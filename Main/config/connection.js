const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Set up the MongoDB connection URL
    const connectionURL = 'mongodb://localhost/social_network';

    // Connect to the database
    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with a non-zero code (failure)
  }
};

module.exports = connectDB;
