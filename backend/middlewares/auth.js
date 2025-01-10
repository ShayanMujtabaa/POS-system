const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateJWT = (req, res, next) => {
  console.log("on backend, authenticate JWT invoked");
  const authHeader = req.headers.authorization;
  console.log("auth header is: ", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    console.log("decoded is: ", decoded, " moving onto next");
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message || error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    console.log("user Role in authorize Role is: ", userRole);

    if (!userRole || !requiredRole.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient privileges" });
    }

    console.log("authorized, moving onwards.");

    next();
  };
};

module.exports = { authenticateJWT, authorizeRole };
