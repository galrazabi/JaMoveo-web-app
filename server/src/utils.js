import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 


// Load json file data
const loadDataFromFilePath = (filePath) => {
    try {
        const fullFilePath =  path.join(__dirname, filePath);
        return JSON.parse(fs.readFileSync(fullFilePath, 'utf-8'));
    } catch (error) {
        console.error("Error in given path or parsing lyrics file:", error);
        return [];
    }
};

const reverseString = (str) => {
    return str.split('').reverse().join('');
}

export const getLyrics = (song) => {
    try {
        const lyricsData = loadDataFromFilePath(song.lyrics_chords_path)
        
        const lyricsLines = lyricsData.map(line => 
            line.map(part => part.lyrics).join(' ')
        );
        return lyricsLines;
    } catch (error) {
        console.error("Error reading or parsing lyrics file:", error);
        return [];
    }
};



export const formatLyricsAndChords = (song) => {
    try {

        const lyricsAndChordsData = loadDataFromFilePath(song.lyrics_chords_path)

        const formattedOutput = [];

        lyricsAndChordsData.forEach(line => {
            let lyricsLine = '';
            let chordsLine = '';
            
            line.forEach(part => {
                const lyricsPart = part.lyrics || '';
                const chordPart = part.chords || '';

                // Add chord above lyrics with precise padding
                chordsLine += chordPart.padEnd(lyricsPart.length + 1 , ' '); // Add 1 space for better alignment
                lyricsLine += lyricsPart + ' ';
            });

            // Trim and push each line to the formatted output
            switch (song.languege){
                case "he":
                    formattedOutput.push(reverseString(chordsLine));
                    break;
                default:
                    formattedOutput.push(chordsLine)
            }
            // formattedOutput.push(chordsLine);
            formattedOutput.push(lyricsLine.trim());  
        });
        return formattedOutput;
    } catch (error) {
        console.error("Error reading or parsing lyrics file:", error);
        return [];
    }
};


export const searchSongsDB = (searchTerm) => {

    //Send path to the mock db and get the songs data
    const songsData = loadDataFromFilePath("../data/songs.json").songs;

    return songsData.filter(song => {
        // Check if term is in song name or artist
        if (song.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
        }

        // parse the lyrics from JS object to string ordered by lines, and check if the line includes the term
        return getLyrics(song).some(line => line.toLowerCase().includes(searchTerm.toLowerCase()))
    });
};