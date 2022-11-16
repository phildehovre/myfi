import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { auth } from '../Config/firebase'
import { fetchPortfolio, fetchWatchlist } from '../Util/db'
import { parseDate, getToday } from '../Util/formatters'
import { InstrumentContext } from './InstrumentContext'

export const WatchlistContext = React.createContext({})

function WatchlistProvider({ children }) {

    const { selectedTicker, setSelectedTicker } = useContext(InstrumentContext)

    const [selectInstrument, setSelectedInstrument] = useState()
    const [watchlist, setWatchlist] = useState([])



    useEffect(() => {
        // console.log('watchlist length: ', watchlist.length === 0)
        // console.log('current user: ', auth.currentUser?.uid.length !== 0)
        if (watchlist.length === 0 && auth.currentUser?.uid) {
            fetchWatchlist(auth.currentUser.uid).then((res, err) => {
                setWatchlist([...res.watchlist])
                setSelectedTicker(res.watchlist[0])
                console.log(res)
            }).catch(err => console.log(err))
        }
    }, [selectedTicker, auth.currentUser])

    useEffect(() => {

    }, [])

    const handleAddToWatchlist = (val) => {
        setWatchlist(prev => ([...prev, val]))
    }

    const handleSelectInstrument = (val) => {
        setSelectedInstrument(val)
    }


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