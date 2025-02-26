import jpkg from "jsonwebtoken";
const { verify } = jpkg;

const verifyToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        // if(!token){
        //     return res.status(401).json({ message: "Access Denied" });
        // }
        try{
            const decodedUser = verify(token, process.env.JWT_SECRET);
            req.user = decodedUser;
            // id
            // role: user
            // req.user.id
            // req.user.role
            next();
        } catch(err) {
            logd(err);
            return res.status(401).json({ message: "Invalid Token" });
        }
    } else {
        return res.status(401).json({ message: "No token, Access Denied" });
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