import jpkg from "jsonwebtoken";
const { verify } = jpkg;

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        logd(err);
        return res.status(403).json({ message: "Forbidden" });
    }
}

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