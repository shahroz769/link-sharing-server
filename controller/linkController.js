import linkValidationSchema from "../schema/linkValidationSchema.js";
import Link from "../schema/linkSchema.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const save = async (req, res) => {
    try {
        console.log("Save Request", req.body);
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);

        const linksToSave = await Promise.all(
            req.body.map(async (body) => {
                const { link, platform, order } = body;
                const objToSave = {
                    link,
                    platform,
                    order,
                };
                await linkValidationSchema.validateAsync(objToSave, {
                    abortEarly: false,
                });
                return {
                    ...objToSave,
                    user: decodedToken.user._id,
                };
            }),
        );
        await Link.deleteMany({ user: decodedToken.user._id });
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
        console.log("GETTING LINKS");
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userID = decodedToken.user._id;
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
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "linkUser",
                },
            },
            {
                $project: {
                    "linkUser.password": 0,
                },
            },
        ]);
        console.log(foundLinks);
        return res
            .status(200)
            .json({ statusCode: 200, links: foundLinks, status: true });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            statusCode: 500,
            message: error.message || "Internal Server Error",
        });
    }
};

export { save, get };
