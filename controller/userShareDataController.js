import Link from "../schema/linkSchema.js";
import User from "../schema/userSchema.js";

const userShareDataController = async (req, res) => {
    try {
        const userName = req.query.userName;
        const foundUser = await User.findOne({ userName });
        if (!foundUser) {
            return res
                .status(404)
                .json({ code: 404, message: "No user found", status: false });
        }
        const foundLinks = await Link.aggregate([
            {
                $match: {
                    user: foundUser._id,
                },
            },
            {
                $sort: {
                    order: 1,
                },
            },
        ]);
        return res.status(200).json({
            code: 200,
            message: "Successfull",
            user: foundUser,
            links: foundLinks,
            status: true,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ code: 500, message: error.message, status: false });
    }
};

export default userShareDataController;
