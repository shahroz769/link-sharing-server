import express from "express";
import { login, logout } from "../../controller/authController.js";

const AUTH = express.Router();

AUTH.route("/").post(login);
AUTH.route("/logout").post(logout);
export default AUTH;
