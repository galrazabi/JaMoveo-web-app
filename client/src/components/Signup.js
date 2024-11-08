import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import "./Auth.css"
import config from '../config.json' ;

// Signup component - Allows users to create a new account
export const Signup = () => {

    const [username, setUsername ] = useState("")
    const [password, setPassword ] = useState("")

    const location = useLocation()
    const navigate = useNavigate()

    // Determine if the current signup is for an admin user based on URL
    const isAdmin = location.pathname.includes("/admin")

    const onSubmit = async (event) => {
        event.preventDefault()

        // Validation to check if username and password are provided
        if (!username || !password) {
            alert("Username and password are required.");
            return; 
        }
        try{

            const instrument = document.getElementById("instrument").value
            
            // Send signup request based on admin status
            if (isAdmin){
                const response = await axios.post(`${config.backend.url}/users/signup/admin`, {username, password, instrument})
            }else {
                const response = await axios.post(`${config.backend.url}/users/signup`, {username, password, instrument})
            }
            
            navigate("/")
            

        } catch(err) {
            if (err.response && err.response.status === 401) {
                alert(err.response.data.message);  
            } else {
                console.error("An unexpected error occurred:", err);
            }
        }
    }

    return (
        <div className="auth-container">
            <h1>{isAdmin ? "Admin Sign Up" : "Sign Up"}</h1>
            <button className="auth-back-btn" onClick={() => navigate('/')}>Back</button>
            <form onSubmit={onSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="instrument">Instrument</label>
                    <select id="instrument">
                        <option value="drums">Drums</option>
                        <option value="guitars">Guitars</option>
                        <option value="bass">Bass</option>
                        <option value="saxophone">Saxophone</option>
                        <option value="keyboards">Keyboards</option>
                        <option value="vocals">Vocals</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
    )
}