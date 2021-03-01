const express = require("express");
const router = express.Router();

const {getAllLessons,getLessonByGroup,getAllGroups} = require("../controller/lessonsControllers")

//@desc GET all lessons from db
//@route GET /api/lessons
//@access Public
router.get("/", getAllLessons);
//@desc GET a lessons by id from db
//@route GET /api/lessons/:id
//@access Public
//router.get("/:id", getLessonById);
router.get("/:group", getLessonByGroup);



module.exports = router;