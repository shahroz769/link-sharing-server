import User from "../schema/userSchema.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import decodeJWT from "../utils/decode.js";

const updateUserDetails = async (req, res) => {
    try {
        const userID = req.user._id;
        const { firstName, lastName, displayEmail } = req.body;
        const foundUser = await User.findByIdAndUpdate(
            userID,
            { firstName, lastName, displayEmail },
            { new: true },
        )
            .lean()
            .exec();
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
        const userID = req.user._id;
        const foundUser = await User.findById(userID).exec();
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
        fs.unlinkSync(req.file.path);
        return res
            .status(500)
            .json({ code: 500, message: error.message, status: false });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const userID = req.user._id;
        const projection = "profile firstName lastName displayEmail userName";
        const foundUser = await User.findById(userID).select(projection).exec();
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
