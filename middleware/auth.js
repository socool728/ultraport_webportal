import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import { USER_ROLES } from "../utils/constants.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error(`Not Authorized, Token Failed.`);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error(`Not Authorized, No Token.`);
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === USER_ROLES.ADMIN) {
    next();
  } else {
    res.status(401);
    throw new Error(`Not Authorized as an ${USER_ROLES.ADMIN}`);
  }
};

const artist = (req, res, next) => {
  if (req.user && req.user.role === USER_ROLES.ARTIST) {
    next();
  } else {
    res.status(401);
    throw new Error(`Not Authorized as an ${USER_ROLES.ARTIST}`);
  }
};

const wxllOwner = (req, res, next) => {
  if (req.user && req.user.role === USER_ROLES.WXLLOWNER) {
    next();
  } else {
    res.status(401);
    throw new Error(`Not Authorized as an ${USER_ROLES.WXLLOWNER}`);
  }
};

export { protect, admin, artist, wxllOwner };
