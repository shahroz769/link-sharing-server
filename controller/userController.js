import User from "../schema/userSchema.js";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import decodeJWT from "../utils/decode.js";

const updateUserDetails = async (req, res) => {
    try {
        const { firstName, lastName, displayEmail } = req.body;
        const decodedToken = await decodeJWT(req, res);
        const foundUser = await User.findById(decodedToken.user._id).exec();
        foundUser.firstName = firstName;
        foundUser.lastName = lastName;
        foundUser.displayEmail = displayEmail;
        await foundUser.save();
        return res.status(200).json({
            code: 200,
            message: "Updated successfully",
            user: foundUser,
            status: true,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ code: 500, message: error.message, status: false });
    }
};

const saveUserImg = async (req, res) => {
    try {
        const decodedToken = await decodeJWT(req, res);
        const foundUser = await User.findById(decodedToken.user._id).exec();
        console.log("foundUser", foundUser);
        const options = {
            public_id: foundUser._id,
            unique_filename: false,
            overwrite: true,
        };
        const result = await cloudinary.uploader.upload(req.file.path, options);
        fs.unlinkSync(req.file.path);
        foundUser.profile = result.secure_url;
        await foundUser.save();
        return res.status(200).json({
            code: 200,
            message: "Image successfully saved",
            url: result.secure_url,
            name: result.public_id,
            status: true,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ code: 500, message: error.message, status: false });
    }
};

const getUserDetails = async (req, res) => {
    try {
        console.log("GET");
        const decodedToken = await decodeJWT(req, res);
        console.log("decodedToken", decodedToken);

        // Specify the fields you want to retrieve in the projection
        const projection = "profile firstName lastName displayEmail userName";

        // Use the select method to apply the projection
        const foundUser = await User.findById(decodedToken.user._id)
            .select(projection)
            .exec();

        console.log("foundUser", foundUser);

        return res.status(200).json({
            code: 200,
            message: "Successful",
            user: foundUser,
            status: true,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ code: 500, message: error.message, status: false });
    }
};

export { updateUserDetails, saveUserImg, getUserDetails };
