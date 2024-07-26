import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  console.log('Cookies:', req.cookies); // Debug: check cookies
  const { token } = req.cookies;
  console.log('Token:', token); // Debug: check token value

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Login First",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

