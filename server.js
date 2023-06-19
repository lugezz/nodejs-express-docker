const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_PORT,
    REDIS_URL, SESSION_SECRET} = require('./config/config');
const cors = require('cors');

// Redis
const RedisStore = require("connect-redis").default;
const session = require("express-session");
const {createClient} = require("redis")

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

app.enable("trust proxy");
app.use(cors({}));

// Redis ------
// Initialize client.
let redisClient = createClient({socket: {
        host: REDIS_URL,
        port: REDIS_PORT,
    }
})
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

// Initialize sesssion storage.
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: SESSION_SECRET,
  })
)

app.use(express.json());
    
app.get('/api/v1', (req, res) => {
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
