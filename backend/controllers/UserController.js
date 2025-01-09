const UserService = require("../services/UserService");

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await UserService.Login({ username, password });
    res.cookie("authToken", token, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error while Loggin in User: ", error.message || error);
    res.status(500).json({ msg: "Failed to Login User" });
  }
};

const Create = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    await UserService.Create({
      username,
      password,
      role,
    });
    res.status(200).json({ msg: "User Created" });
  } catch (error) {
    console.error("Error while Creating User: ", error.message || error);
    res.status(500).json({ msg: "Failed to Create User" });
  }
};

const Delete = async (req, res) => {
  try {
    const { username } = req.body;
    await UserService.Delete({
      username,
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.log("Error while deleting User: " + error);
    res.status(500).json({ msg: "failed to delete User" });
  }
};

const VerifyToken = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = UserService.Verify({ token });
    console.log("decoded: ", decoded);
    res.status(200).json({ role: decoded.role });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { Create, Delete, Login, VerifyToken };
