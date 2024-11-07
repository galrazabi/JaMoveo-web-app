import { useEffect, useState, createContext } from "react";
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"
import { useGetUserId } from '../hooks/useGetUserId'
import { useCookies } from 'react-cookie'
import { MainPlayer } from './MainPlayer'
import { SearchSong } from "./SearchSong";
import { io } from 'socket.io-client';
import {Live} from './Live'


export const SocketContext = createContext();

export const RehearsalRoom = () => {

    const [socket, setSocket] = useState(null);
    const [ isLive, setIsLive ] = useState(false)
    const [lyricsOrChords, setLyricsOrChords] = useState([])
    const [songData, setSongData] = useState({})
  
    const userId = useGetUserId()
    const isAdmin = useGetIsAdmin()
    // const [cookie, setCookie] = useCookies(["access_token"])

    useEffect(() => {
        // Initialize socket connection only once and send the user id saved in the local storage
        const newSocket = io('http://localhost:8000', {
            query : {userId}
        });
        setSocket(newSocket);
        newSocket.on("connect", () => {
            console.log("Socket successfully connected:", newSocket.id);
        });

        const handleStartRehearsal = () => {
            console.log("Client says start Rehearsal");
            setIsLive(true)
        };
        const handleEndRehearsal = () => {
            setIsLive(false)
        };
        const handleLyricsAndChords = ({song ,lyricsAndChords}) => {
            console.log("get lyrics and chords")
            setLyricsOrChords(lyricsAndChords)
            setSongData(song)
        };
        const handleLyrics = ({song ,lyrics}) => {
            setLyricsOrChords(lyrics)
            setSongData(song)
        };
        newSocket.on("sendLyricsAndChords",handleLyricsAndChords);
        newSocket.on("sendLyrics",handleLyrics);

        newSocket.on("startRehearsal", handleStartRehearsal);
        newSocket.on("endRehearsal", handleEndRehearsal);

        
        return () => { 
            newSocket.off("sendLyrics", handleLyricsAndChords);
            newSocket.off("sendLyricsAndChords", handleLyricsAndChords);

            newSocket.off("startRehearsal", handleStartRehearsal); 
            newSocket.off("endRehearsal", handleEndRehearsal); 
            newSocket.disconnect();
        };
    }, [userId, isAdmin]); 


    return (
        < SocketContext.Provider  value={{ socket }}>
        <div>
            { !isLive ? 
                <div>
                    { isAdmin ? <SearchSong /> : <MainPlayer /> }
                </div> : 
                <Live 
                songData = {songData} 
                lyricsOrChords = {lyricsOrChords}  />
            }
        </div>    
        </SocketContext.Provider>
    );

}