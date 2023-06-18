const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');

// Routes
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;


const connectWithRetry = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        })
        .then(() => console.log('Successfully connected to MongoDB'))
        .catch(err => {
            console.error('Something went wrong', err);
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

app.use(express.json());
    
app.get('/', (req, res) => {
    res.send('<h2>Hello world from a Server - Updated!! Ey che!!!</h2>');
    }
);

// Custom Routes
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
    }
);
