const mongoose = require("mongoose");
const groupsSchema = new mongoose.Schema({
    group: {
        type:String,
        required:true
    }
});
const Groups = mongoose.model('groups', groupsSchema);

module.exports = Groups;