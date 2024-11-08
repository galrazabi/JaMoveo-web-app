import { useContext } from "react";
import { SocketContext } from "./RehearsalRoom"
import './Results.css'


export const Results = ({songsList, setSongsList, setIsMain}) => {

    const {socket, logout } = useContext(SocketContext)

    const goToLive = async (song) => {
        socket.emit('adminStartRehearsal', song)
    }
    
    return (
            <div  className="container-fullscreen">
                <div className="nav-bar">
                    <button className="back-btn" onClick={() => setIsMain(true)}>Back</button>
                    <button className="logout" onClick={logout}>Logout</button>
                </div>
                <h1>Showing the Results</h1>

                <p className="description">Browse through the list below to find your song and start the rehearsal session.</p>
                <ul className="song-list">
                    {songsList.map((song) => (
                        <li key={song.name} className="song-item">
                            <button onClick={() => goToLive(song)} className="song-button">
                                <img src={song.image} alt={song.name} className="album-cover" />
                                <div className="song-info">
                                    <p className="song-name">Song: {song.name}</p>
                                    <p className="artist-name">Artist: {song.artist}</p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
                {songsList.length === 0 && <p className="no-results">No songs found. Please try a different search.</p>}
            </div>
    )
}