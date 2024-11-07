import { useContext } from "react";
import { SocketContext } from "./RehearsalRoom"
import { useNavigate} from 'react-router-dom'


export const Results = ({songsList, setSongsList, setIsMain}) => {

    const {socket } = useContext(SocketContext)
    const navigate = useNavigate()

    const goToLive = async (song) => {
        socket.emit('adminStartRehearsal', song)
    }

    const backToMain = () => {
        setSongsList([])
        setIsMain(true)
    }
    
    return (
        <div>
            <h1>Showing the results</h1>
            <ul>
                { songsList.map(( song ) => ( 
                    <li key={song}>
                        <button  type="button" onClick={() => goToLive(song)}>
                            <p>Song Name: {song.name}</p>
                            <p>artist: {song.artist}</p>
                            <img src={song.image} alt={song.name} />
                        </button>
                    </li>
                    
                )) }
            </ul>
            <br />
            <button onClick={() => backToMain()}>Back</button>
        </div>
    )
}