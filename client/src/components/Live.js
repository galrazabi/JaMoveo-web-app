import { SocketContext } from "./socket"
import { useEffect, useState, useContext } from "react";
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"
import { useNavigate} from 'react-router-dom'



export const Live = () => {
    //get the song, if admin quit go back to mainplayer/mainadmin
    const [lyricsOrChords, setLyricsOrChords] = useState([])
    const [songData, setSongData] = useState({})

    const { socket } = useContext(SocketContext)
    const isAdmin = useGetIsAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        const handleLyricsAndChords = ({song ,lyricsAndChords}) => {
            setLyricsOrChords(lyricsAndChords)
            setSongData(song)
        };
        const handleLyrics = ({song ,lyrics}) => {
            setLyricsOrChords(lyrics)
            setSongData(song)
        };
        const handleEndRehearsal = () => {
            setLyricsOrChords("");
            navigate(isAdmin ? "/searchsong" : "/mainplayer");
        };
        
        socket.on("sendLyricsAndChords",handleLyricsAndChords);
        socket.on("sendLyrics",handleLyrics);
        socket.on("endRehearsal", handleEndRehearsal);

        return () => {
            socket.off("sendLyrics", handleLyricsAndChords);
            socket.off("sendLyricsAndChords", handleLyricsAndChords);
            socket.off("endRehearsal", handleEndRehearsal); 
        };
    }, [socket, isAdmin, navigate]);

    const endRehearsal = () => {
        socket.emit("adminEndRehearsal")
    }
    return (
        <div>
            <h1>{songData.name}</h1>
            <div>
                <h4>{songData.artist}</h4>
            </div>
            <div style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                {lyricsOrChords.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
            <br />

            { isAdmin && <button onClick={endRehearsal}>Quit</button> }
        </div>
    )
}