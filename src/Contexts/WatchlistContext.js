import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth } from '../Config/firebase'
import { fetchPortfolio } from '../Util/db'
import { parseDate, getToday } from '../Util/formatters'

export const WatchlistContext = React.createContext({})

function WatchlistProvider({ children }) {

    const [selectInstrument, setSelectedInstrument] = useState()
    const [watchlist, setWatchlist] = useState([{
        "symbol": "F",
        "name": "Ford Motor Co",
        "currency": "USD",
        "exchange": "NYSE",
        "mic_code": "XNYS",
        "country": "United States",
        "type": "Common Stock"
    }])



    console.log(watchlist)
    const handleAddToWatchlist = (val) => {
        console.log(val)
        setWatchlist(prev => ([...prev, val]))
    }

    const handleSelectInstrument = (val) => {
        setSelectedInstrument(val)
    }

    console.log(selectInstrument)

    const value = {
        watchlist,
        handleAddToWatchlist,
        handleSelectInstrument
    }


    return (
        <WatchlistContext.Provider value={value}>
            {children}
        </WatchlistContext.Provider >
    )
}

export default WatchlistProvider