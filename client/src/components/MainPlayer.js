import { useEffect, useContext } from "react"
import { SocketContext } from "./socket"
import { useNavigate} from 'react-router-dom'


export const MainPlayer = () => {

    const socket = useContext(SocketContext)
    const navigate = useNavigate()


    useEffect(() => {
        socket.on('connect', () => {
            console.log("connected to server")
        })


    },[])

    socket.on("startRehearsal", () => {
        console.log("client say start Rehearsal")
        navigate("/live")
    })

    return (
        <div>
            <h1>Waiting for next song</h1>
        </div>
    )
}