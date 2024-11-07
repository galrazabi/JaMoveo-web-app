import { SocketContext } from "./RehearsalRoom"
import { useEffect, useState, useContext } from "react";
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"
import { useNavigate} from 'react-router-dom'



export const Live = ({songData, lyricsOrChords}) => {

    const { socket } = useContext(SocketContext)
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
            <button
                onClick={toggleScroll}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    padding: '10px 20px',
                    backgroundColor: isScrolling ? 'red' : 'green',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '16px',
                    zIndex: 1000
                }}
            >
                {isScrolling ? 'Stop' : 'Start'}
            </button>
        </div>
    )
}