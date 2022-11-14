import React, { useContext } from 'react'
import Section from './Section'
import InstrumentSlice from './InstrumentSlice'
import { WatchlistContext } from '../Contexts/WatchlistContext'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from './Container'

import { uuidv4 } from '@firebase/util'

function Watchlist() {

    const { watchlist } = useContext(WatchlistContext)

    const renderWatchlist = () => {
        if (watchlist || watchlist.length > 0) {
            return (
                watchlist.map(i => {
                    return (
                        <InstrumentSlice data={i} key={uuidv4()} />
                    )
                })
            )
        }

        return (
            <>
                <div>Add some instruments to your wacthlist</div>
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </>
        )
    }

    return (
        <Section width='15vw'>
            <Container
                width='fit-content'
                height='fit-content'
            >{renderWatchlist()}
            </Container>
        </Section>
    )
}

export default Watchlist