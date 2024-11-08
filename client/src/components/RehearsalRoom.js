import { useEffect, useState, createContext } from "react";
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"
import { useGetUserId } from '../hooks/useGetUserId'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import { MainPlayer } from './MainPlayer'
import { SearchSong } from "./SearchSong";
import { io } from 'socket.io-client';
import {Live} from './Live'
import config from '../config.json';


// Create a context for managing WebSocket connections across components
export const SocketContext = createContext();

export const RehearsalRoom = () => {

    const [socket, setSocket] = useState(null);
    const [ isLive, setIsLive ] = useState(false)
    const [lyricsOrChords, setLyricsOrChords] = useState([])
    const [songData, setSongData] = useState({})
    const navigate = useNavigate()
  

    const userId = useGetUserId()
    const isAdmin = useGetIsAdmin()
    const [_, setCookie] = useCookies(["access_token"])


    useEffect(() => {
        // Initialize socket connection only once and send the user id saved in the local storage
        const newSocket = io(`${config.backend.url}`, {
            query : {userId}
        });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Socket successfully connected:", newSocket.id);
        });

        const handleStartRehearsal = () => {
            setIsLive(true)
        };

        const handleEndRehearsal = () => {
            setIsLive(false)
        };

        const handleLyricsAndChords = ({song ,lyricsAndChords}) => {
            setLyricsOrChords(lyricsAndChords)
            setSongData(song)
        };

        const handleLyrics = ({song ,lyrics}) => {
            setLyricsOrChords(lyrics)
            setSongData(song)
        };


        newSocket.on("startRehearsal", handleStartRehearsal);
        newSocket.on("sendLyricsAndChords",handleLyricsAndChords);
        newSocket.on("sendLyrics",handleLyrics);
        newSocket.on("endRehearsal", handleEndRehearsal);

        
        return () => { 
            // Clean up socket listeners on component unmount
            newSocket.off("startRehearsal", handleStartRehearsal); 
            newSocket.off("sendLyrics", handleLyricsAndChords);
            newSocket.off("sendLyricsAndChords", handleLyricsAndChords);
            newSocket.off("endRehearsal", handleEndRehearsal); 
            newSocket.disconnect();
        };
    }, [userId, isAdmin]); 

    // Log out user, ending rehearsal if admin is live
    const logout = () => {
        if (isAdmin && isLive) { 
            socket.emit("adminEndRehearsal")
        }
        setCookie("access_token", "")
        window.localStorage.removeItem("userId")
        window.localStorage.removeItem("isAdmin")
        navigate("/")
    }


    return (
        <SocketContext.Provider value={{ socket, logout }}>
            <div className="container-fullscreen">
                {!isLive ? (
                    <div>
                        {isAdmin ? <SearchSong /> : <MainPlayer />}
                    </div>
                ) : (
                    <Live songData={songData} lyricsOrChords={lyricsOrChords} />
                )}
            </div>

    </SocketContext.Provider>
    );

}