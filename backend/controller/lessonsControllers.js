const Lessons = require("../models/Lessons")

const getAllLessons = async (req, res) => {
    try {
        const lessons = await Lessons.find({});

        res.json(lessons);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "Server Error"});
    }
};
const getLessonByGroup = async (req, res) => {
    try {
        const lesson = await Lessons.find({group:req.params.group});
        res.json(lesson);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "Server Error"});
    }
};
const getLessonById = async (req, res) => {
    try {
        const lesson = await Lessons.findById(req.params.id);
        res.json(lesson);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "Server Error"});
    }
};

module.exports = {
    getAllLessons,
    getLessonById,
    getLessonByGroup,

};