import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken || !refreshToken) {
        return res.status(401).json({ message: "Authentication failed: No token provided" });
    }

    // Verify Access Token
    jwt.verify(accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
        if (!err) {
            // If access token is valid, set user ID and proceed
            req.userId = decoded.userId;
            return next();
        }

        // If Access Token is expired, verify Refresh Token
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (refreshErr, refreshDecoded) => {
            if (refreshErr) {
                return res.status(401).json({ message: "Authentication failed: Both tokens are invalid" });
            }

            // Generate a new Access Token (only)
            const newAccessToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.ACCESS_SECRET, { expiresIn: "5m" });

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            req.userId = refreshDecoded.userId;
            next(); 
        });
    });
};

export default checkAuth;
