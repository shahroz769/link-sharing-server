import express from "express";
import userShareDataController from "../controller/userShareDataController.js";

const SHARE = express.Router();

SHARE.get("/", userShareDataController);

export default SHARE;
