import { useEffect, useContext } from "react"
import { SocketContext } from "./socket"
import { useNavigate} from 'react-router-dom'


export const MainPlayer = () => {

    // const {socket} = useContext(SocketContext) //RR
    const navigate = useNavigate()


    // useEffect(() => { //RR
    //     const handleConnect = () => console.log("Connected to server");
    //     const handleStartRehearsal = () => {
    //         console.log("Client says start Rehearsal");
    //         navigate("/live");
    //     };
        
    //     socket.on('connect', handleConnect);
    //     socket.on("startRehearsal", handleStartRehearsal);

    //     return () => {
    //         socket.off("startRehearsal", handleStartRehearsal); // Clean up only the event listeners
    //         socket.off('connect', handleConnect);
    //     };
    // }, [socket, navigate]);

    return (
        <div>
            <h1>Waiting for next song</h1>
        </div>
    )
}