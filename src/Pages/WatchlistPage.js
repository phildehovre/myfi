import React, { useContext, useState } from 'react'
import TickerDetail from '../Components/TickerDetail'
import Section from '../Components/Section'
import Watchlist from '../Components/Watchlist'
import { WatchlistContext } from '../Contexts/WatchlistContext'
import { InstrumentContext } from '../Contexts/InstrumentContext'

function WatchlistPage() {

    const { watchlist } = useContext(WatchlistContext)
    const [show, setShow] = useState(true)


    console.log(watchlist && watchlist.length ? true : false, show)

    return (
        <Section>
            <Watchlist />
            {show &&
                <TickerDetail />}
        </Section>
    )
}

export default WatchlistPage