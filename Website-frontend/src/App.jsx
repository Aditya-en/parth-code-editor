import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

const App = () => {
    return (
      <div className='body'>
                
        
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
      </div>
        
    );
};

export default App;
