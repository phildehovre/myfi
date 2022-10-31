import React from 'react'
import './Container.scss'

function Container(props) {

    const { height, children } = props

    const style = { height: height ? height : '10em' }

    return (
        <div className='container' style={style}>
            {children}
        </div>
    )
}

export default Container