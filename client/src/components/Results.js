import { useEffect, useState, useContext } from "react";
import { SocketContext } from "./socket"
import { useNavigate} from 'react-router-dom'


export const Results = ({songsList, setSongsList, setIsMain}) => {

    const socket = useContext(SocketContext)
    const navigate = useNavigate()


    const goToLive = (song) => {
        socket.emit('adminStartRehearsal', song)
        setSongsList([])
        setIsMain(true)
        navigate("/live")
    }

    const backToMain = () => {
        setSongsList([])
        setIsMain(true)
    }
    
    return (
        <div>
            <h1>Showing the results</h1>
            <ul>
                { songsList.map(( song ) => ( // should contain song name, artist and image
                    <li key={song}>
                        <button  type="button" onClick={() => goToLive(song)}>
                            <p>Song Name: {song}</p>
                            <p>artist: {song}</p>
                            {/* <img src={recipe.imageURL} alt={recipe.name} /> */}
                        </button>
                    </li>
                    
                )) }
            </ul>
            <br />
            <button onClick={() => backToMain()}>Back</button>
        </div>
        //if there is a song lists show them
    )
}