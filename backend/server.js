const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //connect to our database in MongoDB Atlas

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//The section useNewUrlParser: true is added because the MongoDB Node.js driver 
//rewrote the tool it uses to parse MongoDB connection strings. 
//Because this is such a big change, they put the new connection string parser behind a flag. 
//The section useCreateIndex: true is similar. It is to deal with MongoDB deprecating the ensureIndex() function.
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } //the way we connect to the mongoose database will be deprecated. Now you should add "useUnifiedTopology: true" to the mongoose constructor.
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Following two lines load the routers from other files. Then the routers are added as middleware.
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});