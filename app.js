const express = require('express');
require('dotenv').config();

const schoolRoutes = require('./routes/schools');
const createConnection = require('./config/db'); // Add this line

const app = express();

app.use(express.json());
app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    const connection = await createConnection();
    console.log(" Connected to MySQL database");
    await connection.end();
  } catch (err) {
    console.error(" MySQL connection failed:", err.message);
  }

  console.log(`Server is running on port ${PORT}`);
});