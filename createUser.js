const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://127.0.0.1:27017/fuel-system");

async function createUser() {
  await User.create({
    username: "admin",
    password: "admin123",
    role: "main"
  });

  console.log("User created");
  mongoose.disconnect();
}

createUser();