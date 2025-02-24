import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function checkAuth(req, res, next) {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken || !refreshToken) {
        return res.status(401).json({ message: "Authentication failed: No tokens provided"});
    }

    jwt.verify(accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
        if (!err) {
            // ✅ Auth token is valid, proceed with request
            req.userId = decoded.userId;
            return next();
        }

        // ❌ Auth token is expired, check refresh token
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (refreshErr, refreshDecoded) => {
            if (refreshErr) {
                return res.status(401).json({ message: "Authentication failed: Both tokens are invalid"});
            }

            // ✅ Refresh token is valid, generate a new auth token
            const newaccessToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.ACCESS_SECRET, { expiresIn: "5m" });

            res.cookie("accessToken", newaccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                sameSite: "lax",
            });

            req.userId = refreshDecoded.userId;
            next();
        });
    });
}

export default checkAuth;
