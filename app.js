const express = require('express');
const path = require("path");
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const Port = 7000;
const productRouter = require('./Router/adminrouter');
const DataBaseConnection = require('./config/dataBase');

// Connect to database
DataBaseConnection();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', productRouter);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});