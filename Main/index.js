const express = require('express');
const connectDB = require('./config/connection');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());


connectDB()
  .then(() => {

    app.use('/api', apiRoutes);


    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
