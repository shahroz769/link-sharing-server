const checkTokenValidation = async (req, res, next) => {
    try {
        console.log("Middle Authentication");
        const authorization = req.headers["authorization"];
        if (!authorization) {
            res.clearCookie("jwt");
            return res.status(401).json({
                message: "Unauthorized",
                reason: "No token available.",
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export default checkTokenValidation;
