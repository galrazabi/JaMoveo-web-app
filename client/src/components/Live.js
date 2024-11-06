import { SocketContext } from "./socket"
import { useEffect, useState, useContext } from "react";
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"
import { useNavigate} from 'react-router-dom'



export const Live = () => {
    //get the song, if admin quit go back to mainplayer/mainadmin
    const [songChordsOrLyrics, setSongChordsOrLyrics] = useState("")
    const socket = useContext(SocketContext)
    const isAdmin = useGetIsAdmin()
    const navigate = useNavigate()

    useEffect(() => {
        socket.on('sendLyricsAndChords', (song => {
            setSongChordsOrLyrics(song)
        }))

    })
    socket.on("endRehearsal", () => {
        setSongChordsOrLyrics("")
        navigate(isAdmin ? "/searchsong" : "/mainplayer")
    })

    const endRehearsal = () => {
        socket.emit("adminEndRehearsal")
    }
    return (
        <div>
            <h1>showing chords/ lyrics ...</h1>
            <div>
                <p>{songChordsOrLyrics}</p>
                <p>{isAdmin}</p>
            </div>
            <br />

            { isAdmin && <button onClick={endRehearsal}>Quit</button> }
        </div>
    )
}