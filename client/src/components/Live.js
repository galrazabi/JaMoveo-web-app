import { SocketContext } from "./RehearsalRoom"
import { useEffect, useState, useContext } from "react";
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"
import './Live.css'



export const Live = ({songData, lyricsOrChords}) => {

    const { socket, logout } = useContext(SocketContext)
    const isAdmin = useGetIsAdmin()
    const [isScrolling, setIsScrolling] = useState(false);

    let scrollInterval;

    const toggleScroll = () => { 
        setIsScrolling((prev) => !prev);
    };

    // Automatic scrolling effect when 'isScrolling' is active
    useEffect(() => {
        if (isScrolling) {
            scrollInterval = setInterval(() => {
                window.scrollBy({
                    top: 1, 
                    behavior: 'smooth'
                });
            }, 50); 
        } else {
            clearInterval(scrollInterval);
        }

        return () => clearInterval(scrollInterval); 
    }, [isScrolling]);

    const endRehearsal = () => {
        socket.emit("adminEndRehearsal")
    }
    return (
        <div className="live">
            <div className="nav-bar">
                <button className="logout-btn" onClick={logout}>Logout</button>
                {isAdmin && <button className="quit-btn" onClick={endRehearsal}>Quit</button>}
            </div>  
            <h1 className="song-title">{songData.name}</h1>
            <h4 className="song-artist">{songData.artist}</h4>
            <div className="lyrics">
                {lyricsOrChords.map((line, index) => (
                    <pre key={index} className="lyric-line">{line}</pre>
                ))}
            </div>
            
            <button onClick={toggleScroll} className="scroll-btn">
                {isScrolling ? 'Stop Scroll' : 'Start Scroll'}
            </button>
        </div>
    )
}