const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://devvlinks.vercel.app",
        "https://devslinks.vercel.app",
        "https://links-sharing-e0561.web.app",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};

export default corsOptions;
