import React, { useState, useContext } from 'react'
import Container from '../Components/Container'
import SearchBar from '../Components/SearchBar'
import Section from '../Components/Section'
import TickerDetail from '../Components/TickerDetail'
import { InstrumentContext } from '../Contexts/InstrumentContext'
import { WatchlistContext } from '../Contexts/WatchlistContext'

function DiscoverPage() {

    const { parsedData, tickerObject, selectedTicker } = useContext(InstrumentContext)
    const { watchlist } = useContext(WatchlistContext)

    const data = { parsedData, tickerObject, selectedTicker }

    console.log(watchlist)

    return (
        <>
            <Section height='15em'>
                <Container>
                    <SearchBar height='12em' />
                </Container>
            </Section>
            {selectedTicker && tickerObject &&
                <TickerDetail data={data} />
            }
        </>
    )
}

export default DiscoverPage