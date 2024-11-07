import { SocketContext } from "./RehearsalRoom"
import { useEffect, useState, useContext } from "react";
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"
import { useNavigate} from 'react-router-dom'
import './Live.css'



export const Live = ({songData, lyricsOrChords}) => {

    const { socket, logout } = useContext(SocketContext)
    const isAdmin = useGetIsAdmin()
    const navigate = useNavigate()
    const [isScrolling, setIsScrolling] = useState(false);

    let scrollInterval;

    const toggleScroll = () => { // change and check if like setIsScrolling(!isScrolling) 
        setIsScrolling((prev) => !prev);
    };

    // Automatic scrolling effect
    useEffect(() => {
        if (isScrolling) {
            scrollInterval = setInterval(() => {
                window.scrollBy({
                    top: 1, // Adjust scroll speed here
                    behavior: 'smooth'
                });
            }, 50); // Adjust interval time here for slower/faster scrolling
        } else {
            clearInterval(scrollInterval);
        }

        return () => clearInterval(scrollInterval); // Clean up on component unmount
    }, [isScrolling]);

    const endRehearsal = () => {
        socket.emit("adminEndRehearsal")
    }
    return (
        // <div>
        //     <h1>{songData.name}</h1>
        //     <div>
        //         <h4>{songData.artist}</h4>
        //     </div>
        //     <div style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
        //         {lyricsOrChords.map((line, index) => (
        //             <p key={index}>{line}</p>
        //         ))}
        //     </div>
        //     <br />

        //     { isAdmin && <button onClick={endRehearsal}>Quit</button> }
        //     <button
        //         onClick={toggleScroll}
        //         style={{
        //             position: 'fixed',
        //             bottom: '20px',
        //             right: '20px',
        //             padding: '10px 20px',
        //             backgroundColor: isScrolling ? 'red' : 'green',
        //             color: 'white',
        //             border: 'none',
        //             borderRadius: '50%',
        //             cursor: 'pointer',
        //             fontSize: '16px',
        //             zIndex: 1000
        //         }}
        //     >
        //         {isScrolling ? 'Stop' : 'Start'}
        //     </button>
        // </div>

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