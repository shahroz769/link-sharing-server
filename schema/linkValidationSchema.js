import Joi from "joi";

const linkPatterns = {
    GitHub: /^(https?:\/\/(www\.)?github\.com\/\S+)\/?$/,
    Twitter: /^(https?:\/\/(www\.)?twitter\.com\/\S+)\/?$/,
    LinkedIn: /^(https?:\/\/(www\.)?linkedin\.com\/in\/\S+)\/?$/,
    YouTube: /^(https?:\/\/(www\.)?youtube\.com\/\S+)\/?$/,
    Facebook: /^(https?:\/\/(www\.)?facebook\.com\/\S+)\/?$/,
    Twitch: /^(https?:\/\/(www\.)?twitch\.tv\/\S+)\/?$/,
    DevTo: /^(https?:\/\/(www\.)?dev\.to\/\S+)\/?$/,
    CodeWars: /^(https?:\/\/(www\.)?codewars\.com\/users\/\S+)\/?$/,
    CodePen: /^(https?:\/\/(www\.)?codepen\.io\/\S+)\/?$/,
    FreeCodeCamp: /^(https?:\/\/(www\.)?freecodecamp\.org\/\S+)\/?$/,
    GitLab: /^(https?:\/\/(www\.)?gitlab\.com\/\S+)\/?$/,
    Hashnode: /^(https?:\/\/(www\.)?hashnode\.com\/@\S+\/?)$/,
    StackOverflow: /^(https?:\/\/(www\.)?stackoverflow\.com\/users\/\S+)\/?$/,
    FrontendMentor:
        /^(https?:\/\/(www\.)?frontendmentor\.io\/profile\/\S+)\/?$/,
};

const linkValidationSchema = Joi.object({
    order: Joi.required(),
    platform: Joi.object({
        text: Joi.string(),
        image: Joi.string(),
        placeholder: Joi.string(),
        backgroundColor: Joi.string(),
        color: Joi.string(),
    }).required(),
    link: Joi.string()
        .uri({ scheme: ["http", "https"] })
        .when(Joi.ref("platform.text"), {
            switch: [
                { is: "GitHub", then: Joi.string().regex(linkPatterns.GitHub) },
                {
                    is: "Twitter",
                    then: Joi.string().regex(linkPatterns.Twitter),
                },
                {
                    is: "LinkedIn",
                    then: Joi.string().regex(linkPatterns.LinkedIn),
                },
                {
                    is: "YouTube",
                    then: Joi.string().regex(linkPatterns.YouTube),
                },
                {
                    is: "Facebook",
                    then: Joi.string().regex(linkPatterns.Facebook),
                },
                { is: "Twitch", then: Joi.string().regex(linkPatterns.Twitch) },
                { is: "DevTo", then: Joi.string().regex(linkPatterns.DevTo) },
                {
                    is: "CodeWars",
                    then: Joi.string().regex(linkPatterns.CodeWars),
                },
                {
                    is: "CodePen",
                    then: Joi.string().regex(linkPatterns.CodePen),
                },
                {
                    is: "FreeCodeCamp",
                    then: Joi.string().regex(linkPatterns.FreeCodeCamp),
                },
                { is: "GitLab", then: Joi.string().regex(linkPatterns.GitLab) },
                {
                    is: "Hashnode",
                    then: Joi.string().regex(linkPatterns.Hashnode),
                },
                {
                    is: "StackOverflow",
                    then: Joi.string().regex(linkPatterns.StackOverflow),
                },
                {
                    is: "FrontendMentor",
                    then: Joi.string().regex(linkPatterns.FrontendMentor),
                },
                // Add more cases for additional platforms
                { is: Joi.string(), then: Joi.forbidden() },
            ],
        })
        .required(),
});

export default linkValidationSchema;
