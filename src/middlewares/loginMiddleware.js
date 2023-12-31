import jwt from "jsonwebtoken";


function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, 'your_secret_key', (error, decoded) => {
        if (error) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.userId = decoded.userId;
        next();
    });
}

export default authenticateToken;