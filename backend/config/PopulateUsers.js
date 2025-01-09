const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
require("./loadEnvVars");

// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI; // Replace with your database name

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error.message || error);
    process.exit(1);
  });

const populateUsers = async () => {
  try {
    // Define users to populate
    const users = [
      { username: "employee1", password: "password1", role: "employee" },
      { username: "employee2", password: "password2", role: "employee" },
      { username: "admin1", password: "adminpassword", role: "admin" },
    ];

    // Hash passwords and save users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10); // Hash password with a salt round of 10
      const newUser = new UserModel({
        username: user.username,
        password: hashedPassword,
        role: user.role,
      });
      await newUser.save();
      console.log(`User ${user.username} created successfully.`);
    }

    console.log("All users have been populated.");
  } catch (error) {
    console.error("Error populating users:", error.message || error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Run the function
populateUsers();
