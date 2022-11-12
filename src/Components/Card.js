import React from 'react'
import './Card.scss'

function Card(props) {

    const { children, span } = props

    const styles = {
        gridColumnEnd: `span ${span || '1'}`,
    }

    return (
        <div className='card-ctn' style={styles}>
            {children}
        </div>
    )
}

export default Card