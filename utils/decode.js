import jwt from "jsonwebtoken";
import "dotenv/config";

const decodeJWT = async (req, res) => {
    try {
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return error;
    }
};

export default decodeJWT;
