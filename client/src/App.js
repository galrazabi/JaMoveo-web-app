import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Home} from './components/Home'
import { Signup } from './components/Signup';
import {Login} from './components/Login'
import {MainPlayer} from './components/MainPlayer'
import {MainAdmin} from './components/MainAdmin'
import {Results} from './components/Results'
import {Live} from './components/Live'
import { Navbar } from './components/Navbar';
import { SocketProvider } from './components/socket'
import { RehearsalRoom } from './components/RehearsalRoom';
import { SearchSong } from './components/SearchSong';



function App() {
  return (
    <div className="App">
      <SocketProvider >
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/admin" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/searchsong" element={<SearchSong />} />
            <Route path="/mainplayer" element={<MainPlayer />} />
            <Route path="/live" element={<Live />} />
            <Route path='/rehearsalroom' element={<RehearsalRoom />} />
          </Routes>
        </Router>
      </SocketProvider>
    </div>
  );
}

export default App;