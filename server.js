require("dotenv").config()

const cookieParser = require("cookie-parser");
const path = require("path");
const express = require("express");
const connectDB = require("./config/dbConnect");
const app = express();
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3500;

connectDB()


app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));



app.use('/users',require("./routes/usersRoutes"))


mongoose.connection.once('open', () => {
    console.log("Connected to mongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

})


