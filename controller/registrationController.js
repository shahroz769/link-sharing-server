import bcrypt from "bcrypt";
import userValidationSchema from "../schema/userValidationSchema.js";
import User from "../schema/userSchema.js";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const registerUser = async (req, res) => {
    try {
        await userValidationSchema.validateAsync(req.body);
        const { email, password, userName } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userData = {
            email,
            userName,
            password: hashedPassword,
        };
        const user = new User(userData);
        const newUser = await user.save();
        newUser.password = undefined;
        const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            code: 200,
            message:
                "Account created successfully! You can now log in with your credentials.",
            token,
            user: newUser,
            status: false,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            code: 400,
            message: error.message,
            status: false,
        });
    }
};

export default registerUser;
