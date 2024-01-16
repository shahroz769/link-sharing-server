import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../schema/userSchema.js";

const checkTokenValidation = async (req, res, next) => {
    try {
        const authorization = req.headers["authorization"];
        if (!authorization) {
            res.clearCookie("jwt");
            return res.status(401).json({
                message: "Unauthorized",
                reason: "No token available.",
            });
        }
        const token = authorization.split(" ")[1];
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        const isUser = await User.findById(decodedUser.user._id).exec();
        if (!isUser) {
            res.clearCookie("jwt");
            return res.status(401).json({
                message: "Unauthorized",
                reason: "No user found with the given token.",
            });
        }
        req.user = isUser;
        if (authorization && isUser) next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

export default checkTokenValidation;
