import Joi from "joi";

const userValidationSchema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(30)
        .regex(/^[a-zA-Z]+$/),
    lastName: Joi.string()
        .min(3)
        .max(30)
        .regex(/^[a-zA-Z]+$/),
    email: Joi.string()
        .regex(
            /^[^\x00-\x1F\x7F\x80-\xFF\s()<>@,;:"\[\]|ç%&,]+@[a-zA-Z0-9.-]+\.(com|net|co|org)$/u,
        )
        .required(),
    userName: Joi.string()
        .min(6)
        .max(30)
        .regex(/^[a-z0-9_@.-]+$/)
        .required(),
    displayEmail: Joi.string().regex(
        /^[^\x00-\x1F\x7F\x80-\xFF\s()<>@,;:"\[\]|ç%&,]+@[a-zA-Z0-9.-]+\.(com|net|co|org)$/u,
    ),
    password: Joi.string()
        .min(8)
        .max(64)
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .required(),
    repeatPassword: Joi.ref("password"),
    profile: Joi.string().allow(null).default(null),
});

export default userValidationSchema;
