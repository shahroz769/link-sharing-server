import express from "express";
import registerUser from "../../controller/registrationController.js";

const REGISTRATION = express.Router();

REGISTRATION.route("/").post(registerUser);

export default REGISTRATION;
