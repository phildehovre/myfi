import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Nav.scss'
import { auth } from '../Config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

function Nav() {

    const [user] = useAuthState(auth)
    const [showDropdown, setShowDropdown] = useState(false)

    const handleSignOut = async () => {
        const res = await signOut(auth)

    }

    const userImgStyles = {
        display: 'flex',
        borderRadius: '50px',
        height: '45px',
        width: '45px',
        backgroundColor: user?.photoURL ? '' : 'lightGrey',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const userProfileImg = () => {
        if (user) {
            if (user.photoURL) {
                return (
                    <img src={user?.photoURL || ""} style={userImgStyles}></img>
                )
            } else {
                const name = user.email.slice(0, 3).toUpperCase()
                return (
                    <div style={userImgStyles}>
                        {name}
                    </div>
                )
            }
        }
        return null
    }

    return (
        <nav className='nav-ctn'>
            <div className='logo'>
                <p>MyFi.</p>
            </div>
            <ul>
                <Link className='link-ctn' to='/'>Home</Link>
                <Link className='link-ctn' to='/discover'>Discover</Link>
                <Link className='link-ctn' to='/watchlist'>Watchlist</Link>
                <Link className='link-ctn' to='/about'>About</Link>
                {!user && <Link className='link-ctn' to='/login'>Log in</Link>}
                <div onClick={() => { setShowDropdown(!showDropdown) }} className='link-ctn user'>
                    <div>
                        {user && !user.photoURL && user.displayName?.split(' ')[0]}
                        {userProfileImg()}
                    </div>
                    {showDropdown &&
                        <ul className='hb-menu-dropdown-ctn'>
                            <li className='hb-menu-dropdown-item' onClick={() => { handleSignOut() }}>Sign Out</li>
                            <li className='hb-menu-dropdown-item'>Settings</li>
                        </ul>}
                </div>
            </ul>
        </nav >
    )
}

export default Nav