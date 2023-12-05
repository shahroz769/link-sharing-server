const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://devvlinks.vercel.app",
        "https://devslinks.vercel.app",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};

export default corsOptions;
