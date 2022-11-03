import React, { useState, useContext } from 'react'
import SearchBar from '../Components/SearchBar'
import TickerDetail from '../Components/TickerDetail'

function PortfolioPage() {

    const [portfolio, setPortfolio] = useState()

    return (
        <>
            <SearchBar height='15em' />
            <TickerDetail />
        </>
    )
}

export default PortfolioPage