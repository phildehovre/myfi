import React, { useEffect, useState } from 'react'
import './Section.scss'

function Section(props) {

    const { title, width, height, children, display } = props

    const [gridTemplate, setGridTemplate] = useState('1fr 1fr 1fr')

    useEffect(() => {
        if (display && display === 'flex') {
            styles = {
                ...styles,
                flexDirection: 'column'
            }
        }
    })

    let styles = {
        display: display || 'flex',
        gridTemplateColumns: gridTemplate,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1em',
        height: height || '100vh',
    }

    return (
        <div className='section' >
            {title && <h1>{title}</h1>}
            <div className='section-ctn' style={styles}>
                {children}
            </div>
        </div>

    )
}

export default Section