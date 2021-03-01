require("dotenv").config();

const lessonsData = require("./data/NormalizePdf");
const lessonsDataSample = require("./data/lessons");
const connectDB = require("./config/db");
const Lessons = require("./models/Lessons");
const Groups = require("./models/Groups");
connectDB();




const importData = async () => {
  try {
    await Lessons.deleteMany({});
    const getLessonData = async () => {
      return await lessonsData();
    };
    let getGroupsResponse;
    let getLessonsResponse;
    await getLessonData().then((response) => {
        getLessonsResponse = response.lessons;
        getGroupsResponse = response.groups;
    });
    await Lessons.insertMany(getLessonsResponse);
    await Groups.insertMany(getGroupsResponse);


    console.log("Data import success");
    process.exit();
  } catch (e) {
    console.log(`Data import FAIL>${e}`);
    process.exit(1);
  }
};
importData();