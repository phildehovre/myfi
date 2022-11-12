import React, { useState, useContext } from 'react'
import SearchBar from '../Components/SearchBar'
import TickerDetail from '../Components/TickerDetail'
import { InstrumentContext } from '../Contexts/InstrumentContext'

function PortfolioPage() {

    const [portfolio, setPortfolio] = useState()
    const { selectedTicker } = useContext(InstrumentContext)

    return (
        <>
            <SearchBar height='15em' />
            {selectedTicker &&
                <TickerDetail />
            }
        </>
    )
}

export default PortfolioPage