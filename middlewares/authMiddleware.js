import jpkg from "jsonwebtoken";
const { verify } = jpkg;

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        try{
            const decodedUser = verify(token, process.env.JWT_SECRET);
            req.user = decodedUser;
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

export { verifyToken , verifyGateLogin };