const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://devvlinks.vercel.app",
        "https://devvlinks.netlify.app",
        "https://devvlinks.onrender.com",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};

export default corsOptions;
