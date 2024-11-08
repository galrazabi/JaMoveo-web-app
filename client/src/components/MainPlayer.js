import './MainPlayer.css'
import { useContext } from "react"
import { SocketContext } from "./RehearsalRoom"

// MainPlayer component - Displayed for non-admins when not live
export const MainPlayer = () => {

    const { logout } = useContext(SocketContext)

    return (
        <div className="container-fullscreen main-player">
            <div className="nav-bar">
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
            <h1>Waiting for the next song</h1>
        </div>
    )
}