const mongoose = require("mongoose");
const lessonsSchema = new mongoose.Schema({
    group: {
        type:String,
        required:true
    },
    name : {
        type:String,
        required : true
    },
    teacher: {
        type:String,
        required:false
    },
    place: {
        type:String,
        required:false
    },
    date: {
        type:Date,
        required:true
    },
    time : {
        type: Number,
        required:true
    }
});
const Lessons = mongoose.model('lessons2', lessonsSchema);

module.exports = Lessons;