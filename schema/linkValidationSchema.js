import Joi from "joi";

const linkPatterns = {
    GitHub: /^((https?:\/\/)?(www\.)?github\.com\/\S+)\/?$/i,
    Twitter: /^((https?:\/\/)?(www\.)?twitter\.com\/\S+)\/?$/i,
    LinkedIn: /^((https?:\/\/)?(www\.)?linkedin\.com\/in\/\S+)\/?$/i,
    YouTube: /^((https?:\/\/)?(www\.)?youtube\.com\/\S+)\/?$/i,
    Facebook: /^((https?:\/\/)?(www\.)?facebook\.com\/\S+)\/?$/i,
    Twitch: /^((https?:\/\/)?(www\.)?twitch\.tv\/\S+)\/?$/i,
    DevTo: /^((https?:\/\/)?(www\.)?dev\.to\/\S+)\/?$/i,
    CodeWars: /^((https?:\/\/)?(www\.)?codewars\.com\/users\/\S+)\/?$/i,
    CodePen: /^((https?:\/\/)?(www\.)?codepen\.io\/\S+)\/?$/i,
    FreeCodeCamp: /^((https?:\/\/)?(www\.)?freecodecamp\.org\/\S+)\/?$/i,
    GitLab: /^((https?:\/\/)?(www\.)?gitlab\.com\/\S+)\/?$/i,
    Hashnode: /^((https?:\/\/)?(www\.)?hashnode\.com\/@\S+\/?)$/i,
    StackOverflow:
        /^((https?:\/\/)?(www\.)?stackoverflow\.com\/users\/\S+)\/?$/i,
    FrontendMentor:
        /^((https?:\/\/)?(www\.)?frontendmentor\.io\/profile\/\S+)\/?$/i,
    WhatsApp: /^((https?:\/\/)?wa\.me\/\S+)\/?$/i,
    XDA: /^((https?:\/\/)?(www\.)?xdaforums\.com\/m\/\S+)\/?$/i,
    Instagram: /^((https?:\/\/)?(www\.)?instagram\.com\/\S+)\/?$/i,
    Discord: /^((https?:\/\/)?discord\.com\/users\/\S+)\/?$/i,
    Telegram: /^((https?:\/\/)?t\.me\/\S+)\/?$/i,
    Threads: /^((https?:\/\/)?threads\.com\/user\/\S+)\/?$/i,
    Website: /^((https?:\/\/)?\S+)\/?$/i,
    Reddit: /^((https?:\/\/)?(www\.)?reddit\.com\/user\/\S+)\/?$/i,
    Quora: /^((https?:\/\/)?(www\.)?quora\.com\/profile\/\S+)\/?$/i,
    TikTok: /^((https?:\/\/)?(www\.)?tiktok\.com\/@\S+)\/?$/i,
    Snapchat: /^((https?:\/\/)?(www\.)?snapchat\.com\/add\/\S+)\/?$/i,
    Tumblr: /^((https?:\/\/)?(www\.)?tumblr\.com\/\S*)$/i,
    Fiverr: /^((https?:\/\/)?(www\.)?fiverr\.com\/\S+)\/?$/i,
    Upwork: /^((https?:\/\/)?(www\.)?\.upwork\.com\/freelancers\/\S+)\/?$/i,
    Medium: /^((https?:\/\/)?medium\.com\/@\S+)\/?$/i,
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
                {
                    is: "WhatsApp",
                    then: Joi.string().regex(linkPatterns.WhatsApp),
                },
                { is: "XDA", then: Joi.string().regex(linkPatterns.XDA) },
                {
                    is: "Instagram",
                    then: Joi.string().regex(linkPatterns.Instagram),
                },
                {
                    is: "Discord",
                    then: Joi.string().regex(linkPatterns.Discord),
                },
                {
                    is: "Telegram",
                    then: Joi.string().regex(linkPatterns.Telegram),
                },
                {
                    is: "Threads",
                    then: Joi.string().regex(linkPatterns.Threads),
                },
                {
                    is: "Website",
                    then: Joi.string().regex(linkPatterns.Website),
                },
                { is: "Reddit", then: Joi.string().regex(linkPatterns.Reddit) },
                { is: "Quora", then: Joi.string().regex(linkPatterns.Quora) },
                { is: "TikTok", then: Joi.string().regex(linkPatterns.TikTok) },
                {
                    is: "Snapchat",
                    then: Joi.string().regex(linkPatterns.Snapchat),
                },
                { is: "Tumblr", then: Joi.string().regex(linkPatterns.Tumblr) },
                { is: "Fiverr", then: Joi.string().regex(linkPatterns.Fiverr) },
                { is: "Upwork", then: Joi.string().regex(linkPatterns.Upwork) },
                { is: "Medium", then: Joi.string().regex(linkPatterns.Medium) },
                { is: Joi.string(), then: Joi.forbidden() },
            ],
        })
        .required(),
});

export default linkValidationSchema;
