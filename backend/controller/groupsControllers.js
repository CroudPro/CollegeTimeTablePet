const Groups = require("../models/Groups")
const getAllGroups = async (req, res) => {
    try {
        let groups = await Groups.find({});
        res.json(groups);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "Server Error"});
    }
};
module.exports ={
    getAllGroups
};