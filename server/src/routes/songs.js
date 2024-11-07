import express from 'express';
import { UsersModel } from '../models/Users.js';
import {verifyToken} from "../verifyToken.js"
import { searchSongsDB } from "../databaseOperations.js"
 

const router = express.Router()

router.get('/match/song/list/:searchTerm', verifyToken, (req, res) => {

    const { searchTerm } = req.params;
    // Search for songs that match the search term in the mock hard-coded database
    const matchingSongs = searchSongsDB(searchTerm);
    res.json({matchingSongs});
});

export {router as songRouter}