import jwt from 'jsonwebtoken'
import config from '../config.json' assert { type: 'json' };

const secret = config.SECRET

// Middleware to verify JWT token for protected routes
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secret, (err) => {
            if(err) return res.sendStatus(403);
            next();
        });
    } else{
        res.sendStatus(401);
    }
}