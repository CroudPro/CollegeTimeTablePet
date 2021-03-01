require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const lessonsRoutes = require('./routes/lessonsRoutes')
const groupsRoutes = require('./routes/groupRoutes')
connectDB();


const app = express();

app.use(express.json());

app.use('/api/lessons',lessonsRoutes);
app.use('/api/groups',groupsRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
});