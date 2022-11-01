import React, { useState, useContext } from 'react'
import SearchBar from '../Components/SearchBar'

function PortfolioPage() {

    const [portfolio, setPortfolio] = useState()

    return (
        <SearchBar height='15em' />
    )
}

export default PortfolioPage