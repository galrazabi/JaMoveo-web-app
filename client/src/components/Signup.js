import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

export const Signup = () => {

    const [username, setUsername ] = useState("")
    const [password, setPassword ] = useState("")
    const location = useLocation()
    const navigate = useNavigate()

    const isAdmin = location.pathname.includes("/admin")

    const onSubmit = async (event) => {
        event.preventDefault()
        try{

            const instrument = document.getElementById("instrument").value

            if (isAdmin){
                const response = await axios.post("http://localhost:8000/users/signup/admin", {username, password, instrument})
            }else {
                const response = await axios.post("http://localhost:8000/users/signup", {username, password, instrument})
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
        <div>
            <h1>{isAdmin && "Admin"} Sign Up </h1> 
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='username' >Username</label>
                    <input type='text' id='username' value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='instrument'>Instrument</label>
                    <select id='instrument' >
                        <option value="drums">Drums</option>
                        <option value="guitars">Guitars</option>
                        <option value="bass">Bass</option>
                        <option value="saxophone">Saxophone</option>
                        <option value="keyboards">Keyboards</option>
                        <option value="vocals">Vocals</option>
                    </select>
                </div>
                <button type='submit'>Register</button>

            </form>
        </div>
    )
}