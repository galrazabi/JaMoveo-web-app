import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Home} from './components/Home'
import { Signup } from './components/Signup';
import {Login} from './components/Login'
import { RehearsalRoom } from './components/RehearsalRoom';


function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/admin" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path='/rehearsalroom' element={<RehearsalRoom />} /> 
          </Routes>
        </Router>
    </div>
  );
}

export default App;
