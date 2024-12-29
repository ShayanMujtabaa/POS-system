const mongoose = require('mongoose');
const logger = require("../utils/loggers");

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        logger.logger.info("Connected to MongoDB");
    } catch (err) {
        logger.ErrorLogger.error("couldnt connect to mongoDB", new Error(err));
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the app with failure
    }
};

module.exports = connectDB;