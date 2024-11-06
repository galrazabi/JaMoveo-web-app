import {Results} from './Results'
import {MainAdmin} from './MainAdmin'
import { useState } from 'react'

export const SearchSong = () => {

    const [songsList , setSongsList ] = useState([])
    const [isMain, setIsMain ] = useState(true)
    
    return (
        <div>
            {isMain ? 
                <MainAdmin setSongsList={setSongsList} setIsMain={setIsMain} /> :
                <Results songsList= {songsList} setSongsList={setSongsList} setIsMain={setIsMain}/>
            }
        </div>
    )
}