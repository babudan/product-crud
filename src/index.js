const express = require('express')
const route = require('./routes/route.js')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

// edge case for api req
app.use((req, res, next) => {
    res.status(400).send({ status: false, error: "ROUTE ENDPOINT IS WRONG..." });
});

app.listen(process.env.PORT, () => {
    console.log(`Express app running on port ${process.env.PORT}`)
});