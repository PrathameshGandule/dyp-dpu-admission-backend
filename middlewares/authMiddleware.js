import jpkg from "jsonwebtoken";
const { verify } = jpkg;

// const verifyToken = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }
//         const decoded = verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         logd(err);
//         return res.status(403).json({ message: "Forbidden" });
//     }
// }

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    // Check if Authorization header exists and starts with 'Bearer '
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, Access Denied" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedUser = verify(token, process.env.JWT_SECRET);
        req.user = decodedUser; // Contains user ID & role from token
        next(); // Proceed to next middleware
    } catch (err) {
        logd(err);
        return res.status(401).json({ message: "Invalid Token" });
    }
};

const verifyGateLogin = (req, res, next) => {
    if(req.user.role === "gate"){
        next();
    } else {
        return res.status(403).json({ message: "You aren't authorized !" });
    }
}

const verifyDesk = (...allowedDesks) => {
    return (req, res, next) => {
        const isAllowed = allowedDesks.includes(req.user.role);
        if (!isAllowed) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    }
}

export { verifyToken , verifyGateLogin , verifyDesk };