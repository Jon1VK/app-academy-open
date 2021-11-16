const mongoose = require('mongoose');
const mongoURI = require('./config/keys').mongoURI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!!!'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
