const express = require('express');
const connectDB = require('./config/connection');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => {
    // API Routes
    app.use('/api', apiRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process with a non-zero code (failure)
  });
