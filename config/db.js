const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
    
const mongoose = require('mongoose');
const config  = require('./env');


async function connectDB() {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connection Successful");
}

module.exports = connectDB;