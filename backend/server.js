const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Express Server
const app = express();
const port = process.env.PORT || 4000;


// Middleware
app.use(cors());
app.use(express.json());

const URI = process.env.ATLAS_URI;

mongoose.connect(URI, {
  useNewUrlParser: true, 
  useCreateIndex: true,
  useUnifiedTopology: true
}
  );

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const exercisesRouter = require('./routes/exercises');
const usersRoutes = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRoutes);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

