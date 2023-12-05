import express from "express";
import {
    updateUserDetails,
    saveUserImg,
    getUserDetails,
} from "../controller/userController.js";
import upload from "../utils/multer.js";

const USER = express.Router();

USER.get("/", getUserDetails);
USER.post("/update-user", updateUserDetails);
USER.post("/image", upload.single("file"), saveUserImg);

export default USER;
