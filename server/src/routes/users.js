import express from 'express';
import { UsersModel } from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const slatRounds = Number(process.env.SALT_ROUNDS)
const secret = process.env.SECRET
const router = express.Router()


router.post("/signup", async (req, res) => {
    signup(req, res, false)
})

router.post("/signup/admin", async (req, res) => { 
    signup(req, res, true)
})

router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    const user = await UsersModel.findOne({username})

    if( !user ) {
        return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if ( !isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({id: user._id}, secret)

    res.json({token, userId: user._id, isAdmin: user.isAdmin })
})


const signup = async (req, res, isAdmin) => {

    const {username, password, instrument} = req.body;

    const user = await UsersModel.findOne({ username });

    if(user){   
        return res.status(401).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, slatRounds)

    const newUser = new UsersModel({username, password: hashedPassword, instrument, isAdmin})
    await newUser.save()

    res.json({message: "User registerd! Please log in"})
}


export const getUserInstrumentFromDB = async ( userId ) => {

    try{
        const user = await UsersModel.findById(userId)
        return user.instrument

    } catch (err) {
        console.error("Error fetching data from databse" +err)
    }
}


export {router as userRouter}

