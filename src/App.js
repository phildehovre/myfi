import './App.css';
import Home from './Pages/Home';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import Nav from './Components/Nav';
import './Global.scss'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/Login' element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
