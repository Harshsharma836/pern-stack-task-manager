import express from "express";
import {
  login,
  logout,
  myProfile,
  register,
  deleteProfile
} from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, myProfile);
router.post("/register", register);
router.delete("/profile",isAuthenticated, deleteProfile );

export default router;
