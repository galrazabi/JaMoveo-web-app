import express from 'express';
import { UsersModel } from '../models/Users.js';
import {verifyToken} from "../verifyToken.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';//////

const __filename = fileURLToPath(import.meta.url); ////////
const __dirname = path.dirname(__filename);  ///////////

const router = express.Router()

router.get('/match/song/list/:songName', verifyToken , async (req,res) => {
    const songName = req.params.songName.toLowerCase()

    const dataDir = path.join(__dirname, '../../data'); //////////

    try {
        const files = fs.readdirSync(dataDir);
        const matchingFiles = [];

        files.forEach(file => {
            const filePath = path.join(dataDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8'); // Read file content
            let jsonData;

            try {
                jsonData = JSON.parse(fileContent); // Parse JSON content
            } catch (error) {
                console.error(`Error parsing JSON in file ${file}:`, error);
                return;
            }

            // Helper function to search recursively for the word in JSON
            const searchInLyrics = (data) => {
                if (Array.isArray(data)) {
                    return data.some(item => searchInLyrics(item));
                } else if (typeof data === 'object' && data !== null) {
                    return Object.values(data).some(value => searchInLyrics(value));
                } else if (typeof data === 'string') {
                    return data.toLowerCase().includes(songName); // Check if string contains the search term
                }
                return false;
            };

            // If the file contains the search term, add the filename to matchingFiles
            if (searchInLyrics(jsonData)) {
                matchingFiles.push(file);
            }
        });

        // Return the matching file names
        res.json({ matchingFiles });
    } catch (error) {
        console.error("Error reading files:", error);
        res.status(500).json({ message: "An error occurred while searching for songs." });
    }

})

export {router as songRouter}