import bcrypt from "bcrypt";
import userValidationSchema from "../schema/userValidationSchema.js";
import User from "../schema/userSchema.js";

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
        console.log(newUser);
        res.status(200).send({
            status: 200,
            message:
                "Account created successfully! You can now log in with your credentials.",
            user: newUser,
        });
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: error.message,
        });
    }
};

export default registerUser;
