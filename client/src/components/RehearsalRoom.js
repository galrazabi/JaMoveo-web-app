import { useEffect, useState, useContex, createContext } from "react";
import { useNavigate} from 'react-router-dom'
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"
import { useGetUserId } from '../hooks/useGetUserId'
import { useCookies } from 'react-cookie'
import axios from "axios"
import { MainPlayer } from './MainPlayer'
import { SearchSong } from "./SearchSong";
import { io } from 'socket.io-client';

export const RehearsalRoom = () => {

    const [socket, setSocket] = useState(null);
    const [ isLive, setIsLive ] = useState(false)
    const SocketContext = createContext();
    const navigate = useNavigate()
    const userId = useGetUserId()
    const isAdmin = useGetIsAdmin()
    const [cookie, setCookie] = useCookies(["access_token"])

    useEffect(() => {
        // Initialize socket connection only once and send the user id saved in the local storage
        const newSocket = io('http://localhost:8000', {
            query : {userId}
        });
        setSocket(newSocket);
        console.log("Socket connected:", socket.id);

        const handleStartRehearsal = () => {
            console.log("Client says start Rehearsal");
            setIsLive(true)
            navigate("/live");
        };



        socket.on("startRehearsal", handleStartRehearsal);

        socket.on('disconnect', () => {
            console.log("Socket disconnected");
        });

        
        return () => { 
            socket.disconnect();
            // setCookie("access_token", "")
            // window.localStorage.removeItem("userId")
            // window.localStorage.removeItem("isAdmin")
        };
    }, []); 


    return (
        < SocketContext.Provider  value={{ socket }}>
        <div>


            <div>
                { isAdmin ? <SearchSong /> : <MainPlayer /> }
            </div>
        </div>


            
        </SocketContext.Provider>
    );

}