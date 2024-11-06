import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config()
const secret = process.env.SECRET

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