require("dotenv").config();
const express = require("express");
const path = require('path')
const connectDB = require("./config/db.js");
const lessonsRoutes = require('./routes/lessonsRoutes')
const groupsRoutes = require('./routes/groupRoutes')
connectDB();


const app = express();

app.use(express.json());

app.use('/api/lessons',lessonsRoutes);
app.use('/api/groups',groupsRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,'../frontend/build')));
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,'../frontend','build','index.html'))
    })
}else {
    app.get("/",(req,res) => {
        res.send("Api Running");
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
});