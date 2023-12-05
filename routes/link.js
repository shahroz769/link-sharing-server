import express from "express";
import checkTokenValidation from "../middleware/checkTokenValidation.js";
import { save, get } from "../controller/linkController.js";

const LINK = express.Router();

LINK.route("/").get(get);
LINK.route("/save").post(save);

export default LINK;
