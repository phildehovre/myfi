import React, { useEffect } from 'react'
import './App.css';
import Home from './Pages/Home';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import Nav from './Components/Nav';
import './Global.scss'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { getUser } from './Util/db'
import PortfolioPage from './Pages/PortfolioPage';
import { auth } from './Config/firebase'


function App() {

  useEffect(() => {
    const res = getUser('fZ6gshP46NQdl9GvUYEN')
    res.then((res, err) => {
    })
  })

  console.log(auth.currentUser.uid)

  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/portfolio' element={<PortfolioPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/Login' element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
