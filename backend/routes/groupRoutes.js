const express = require("express");
const router = express.Router();

const {getAllGroups} = require("../controller/groupsControllers")



router.get("/", getAllGroups);

module.exports = router;