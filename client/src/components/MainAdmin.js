import { useState, useEffect, useContext } from "react"
import { SocketContext } from "./socket"
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"
import { useCookies } from 'react-cookie'
import axios from "axios"



export const MainAdmin = ({ setSongsList, setIsMain}) => {

    const [songName, setSongName] = useState("")
    const socket = useContext(SocketContext)
    const [cookie, _ ] = useCookies("access_token")

    useEffect(() => {
        socket.on('connect', () => {
            console.log("connected to server")
        })
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.get(`http://localhost:8000/songs/match/song/list/${songName}`, {headers: {authorization : cookie.access_token}});
            setSongsList(await response.data.matchingFiles)
            setIsMain(false)
            //console.log(await response.data.matchingFiles)

        }catch(err) {
            console.error(err)
        }
    }

    return (
        <div>

            <h1>Search any song</h1>
            <form onSubmit={ onSubmit }>
                <input type="text" value={songName} onChange={(e) => setSongName(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        </div>

    )
}