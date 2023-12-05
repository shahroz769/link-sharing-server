import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        userName: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        displayEmail: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

const User = model("User", userSchema);

export default User;
