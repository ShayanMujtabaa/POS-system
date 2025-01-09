const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const SECRET_KEY = process.env.SECRET_KEY;

const Create = async ({ username, password, role }) => {
  try {
    const newUser = new UserModel({
      username,
      password,
      role,
    });
    return await newUser.save();
  } catch (error) {
    console.error("Error in UserService Create: ", error.message || error);
    throw new Error("Failed to save User");
  }
};

const Delete = async ({ username }) => {
  try {
    return await UserModel.deleteOne({ username: username });
  } catch (error) {
    console.error("Error in UserService Delete: ", error.message || error);
    throw new Error(`Failed to Delete User with username: ${username}`);
  }
};

const Login = async ({ username, password }) => {
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
      { username: user.username, role: user.role },
      SECRET_KEY
    );
    return { user, token };
  } catch (error) {
    console.error("Error in UserService Login: ", error.message || error);
    throw new Error("Failed to login User");
  }
};

const Verify = ({ token }) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.error("Error in UserService Verify: ", error.message || error);
    throw new Error("Failed to Verify User");
  }
};

module.exports = { Create, Delete, Login, Verify };
