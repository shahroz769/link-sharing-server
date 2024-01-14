import jwt from "jsonwebtoken";
import "dotenv/config";

const checkTokenValidation = async (req, res, next) => {
    try {
        console.log("Middle Authentication");
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const noUser = jwt.verify(token, process.env.JWT_SECRET);
        if (!authorization) {
            res.clearCookie("jwt");
            return res.status(401).json({
                message: "Unauthorized",
                reason: "No token available.",
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

export default checkTokenValidation;
