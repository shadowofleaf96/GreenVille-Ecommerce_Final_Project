// Shadow Of Leaf was Here
require("dotenv").config({ path: "../.env" });
const secretKey = process.env.SECRETKEY;
const secretRefreshKey = process.env.REFRESHSECRETLEY;
const jwt = require("jsonwebtoken");
import {LocalStorage} from 'node-localstorage' 
var localStorage = new LocalStorage('./scratch'); 

const verifyToken = (req, res, next) => {
  const userToken =
    localStorage.getItem("user_access_token") ||
    localStorage.getItem("customer_access_token");

  if (!userToken) {
    return res
      .status(403)
      .send("A token is required for authentication, login again and repeat");
  }

  try {
    const decoded = jwt.verify(userToken, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

const requireAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role && role.includes("admin")) {
    next();
  } else {
    return res.status(403).json({ message: "You don't have enough privilege" });
  }
};

const requireAdminOrManager = (req, res, next) => {
  const { role } = req.user;
  if (role && (role.includes("admin") || role.includes("manager"))) {
    next();
  } else {
    return res.status(403).json({ message: "You don't have enough privilege" });
  }
};

module.exports = {
  verifyToken,
  requireAdmin,
  requireAdminOrManager,
};

module.exports = { verifyToken, requireAdmin, requireAdminOrManager };
