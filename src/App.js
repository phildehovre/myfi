import React from 'react'
import './App.css';
import Home from './Pages/Home';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import Nav from './Components/Nav';
import './Global.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PortfolioPage from './Pages/PortfolioPage';
import InstrumentProvider from './Contexts/InstrumentContext';


function App() {

  return (
    <div className="App">
      <InstrumentProvider>
        <Router>
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/portfolio' element={<PortfolioPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/Login' element={<LoginPage />} />
          </Routes>
        </Router>
      </InstrumentProvider>
    </div>
  );
}

export default App;
