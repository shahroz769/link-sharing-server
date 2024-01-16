import linkValidationSchema from "../schema/linkValidationSchema.js";
import Link from "../schema/linkSchema.js";
import mongoose from "mongoose";

const save = async (req, res) => {
    try {
        const userID = req.user._id;
        const linksToSave = await Promise.all(
            req.body.map(async (body) => {
                const { link, platform, order } = body;
                const objToSave = {
                    link,
                    platform: {
                        text: platform.text,
                        placeholder: platform.placeholder,
                        backgroundColor: platform.backgroundColor,
                        color: platform.color,
                    },
                    order,
                };
                await linkValidationSchema.validateAsync(objToSave, {
                    abortEarly: false,
                });
                return {
                    ...objToSave,
                    user: userID,
                };
            }),
        );
        const currentTime = new Date();
        await Link.deleteMany({
            user: userID,
        });
        await Link.insertMany(linksToSave);
        return res.status(200).json({
            statusCode: 200,
            message: "Saved Successfully",
            status: true,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ statusCode: 500, message: error.message, status: false });
    }
};

const get = async (req, res) => {
    try {
        const userID = req.user._id;
        const foundLinks = await Link.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userID),
                },
            },
            {
                $sort: {
                    order: 1,
                },
            },
            {
                $project: {
                    "platform.image": 0,
                    user: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                    _id: 0,
                },
            },
        ]);
        return res
            .status(200)
            .json({ statusCode: 200, links: foundLinks, status: true });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            statusCode: 500,
            message: error.message || "Internal Server Error",
        });
    }
};

export { save, get };
