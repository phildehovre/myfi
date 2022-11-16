import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import InstrumentProvider from './Contexts/InstrumentContext';
import WatchlistProvider from './Contexts/WatchlistContext';
import Home from './Pages/Home';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import Nav from './Components/Nav';
import './Global.scss'
import DiscoverPage from './Pages/DiscoverPage';
import WatchlistPage from './Pages/WatchlistPage';
import { auth } from './Config/firebase';


function App() {
  console.log(auth)
  return (
    <div className="App">
      <InstrumentProvider>
        <WatchlistProvider>
          <Router>
            <Nav />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/discover' element={<DiscoverPage />} />
              <Route path='/watchlist' element={<WatchlistPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/Login' element={<LoginPage />} />
            </Routes>
          </Router>
        </WatchlistProvider>
      </InstrumentProvider>
    </div>
  );
}

export default App;
