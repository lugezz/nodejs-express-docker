const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h2>Hello world from a Server - Updated!! Ey che!!!</h2>');
    }
);


app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
    }
);

// TODO: Use environment variables
mongoose.connect('mongodb://artime:artime80@mongo:27017/?authSource=admin')
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('Something went wrong', err));
