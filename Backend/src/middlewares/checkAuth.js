import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function checkAuth(req, res, next) {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        console.log("No access token provided");
        return res.status(401).json({ message: "Authentication failed: No token provided" });
    }

    jwt.verify(accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) {
            console.log("Access token invalid or expired:", err);
            return res.status(401).json({ message: "Authentication failed: Token invalid or expired" });
        }

        console.log("Access token valid");
        req.userId = decoded.userId;
        next();
    });
}

export default checkAuth;