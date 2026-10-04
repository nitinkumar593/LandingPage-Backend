const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = ['PORT','MONGO_URI'];

requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

const config = {
    PORT:process.env.PORT,
    MONGO_URI:process.env.MONGO_URI,
}

module.exports = config;