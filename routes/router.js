import express from "express";
import REGISTRATION from "./authentication/registrationRoutes.js";
import AUTH from "./authentication/authRoutes.js";
import LINK from "./link.js";
import checkTokenValidation from "../middleware/checkTokenValidation.js";
import USER from "./user.js";
import SHARE from "./share.js";

const router = express.Router();

router.use("/signup", REGISTRATION);
router.use("/login", AUTH);
router.use("/link", checkTokenValidation, LINK);
router.use("/profile", checkTokenValidation, USER);
router.use("/share", SHARE);

export default router;
