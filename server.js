const express = require('express');
const app = express();
const config = require('./config/env');
const connectDB = require('./config/db');
const userModel = require('./models/user');
const cors = require('cors');

app.use(express.json());
app.use(cors());

connectDB()
    .then(() => console.log("DB Ready"))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

app.post("/signUp", async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received Data');
    console.log({
        username,
        email,
    });

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All feild are require' });
    }

    const isAlreadyRegistered = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (isAlreadyRegistered) {
        return res.status(401).json({ message: "User already registered" })
    }

    const newUser = await userModel.create({ username, email, password });

    return res.status(200).json({
        message: "User registered successfully",
        user: {
            username: newUser.username,
            email: newUser.email
        }
    })

});

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`Server is listing to Port : ${PORT}`)
})  