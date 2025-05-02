const mongoose = require('mongoose');

const db = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://vivekpractice:sVMap0oJTRuVkb64@practicecluster0.n9ceii3.mongodb.net/?retryWrites=true&w=majority&appName=practiceCluster0');
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); 
  }
};

module.exports = db;
