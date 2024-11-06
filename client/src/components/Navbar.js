import { Link } from 'react-router-dom'
// import { useGetUserID } from '../hooks/useGetUserId'
import {useCookies } from 'react-cookie'
import { useNavigate, useLocation } from 'react-router-dom'
import { SocketContext } from "./socket"
import { useContext, useEffect } from "react"
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"


 

export const Navbar = () => {

    const { socket } = useContext(SocketContext);
    const [cookie, setCookie] = useCookies(["access_token"]) 
    const navigate = useNavigate()
    const isAdmin = useGetIsAdmin()
    const location = useLocation()
    const isLive = location.pathname.includes("/live")

    const logout = () => {
        if (isAdmin && isLive) {
            socket.emit("adminEndRehearsal")
        }
        setCookie("access_token", "")
        window.localStorage.removeItem("userId")
        window.localStorage.removeItem("isAdmin")
        navigate("/")
    }

    return(
        <div>
        {!cookie.access_token ? 
            <>
                <Link to="/">Home</Link> 
                <Link to="/signup">Signup</Link> 
                <Link to="/login">Login</Link>
            </>:
            <>
                <button onClick={logout}>Logout</button>
            </>

        }


        </div>
    )

}

