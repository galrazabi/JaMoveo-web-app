import { Link } from 'react-router-dom'
import {useCookies } from 'react-cookie'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGetIsAdmin } from "../hooks/useGetIsAdmin"


 

export const Navbar = () => {

    const [cookie, setCookie] = useCookies(["access_token"]) 
    const navigate = useNavigate()
    const isAdmin = useGetIsAdmin()
    const location = useLocation()
    const isLive = location.pathname.includes("/live")

    const logout = () => {
        // if (isAdmin && isLive) { //RR
        //     socket.emit("adminEndRehearsal")
        // }
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

