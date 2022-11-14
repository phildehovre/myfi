import React from 'react'
import './Container.scss'

function Container(props) {

    const {
        height,
        children,
        display,
        width,
        justify
    } = props

    const style = {
        height: height ? height : '10em',
        display: display || 'flex',
        width: width || 'fit-content',
        justifyContent: justify || 'center'
    }

    return (
        <div className='container' style={style}>
            {children}
        </div>
    )
}

export default Container