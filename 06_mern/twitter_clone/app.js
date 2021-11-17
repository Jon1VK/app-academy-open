const express = require('express');
const passport = require('./config/passport');
const api = require('./routes/api');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport);

app.use('/api', api);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
