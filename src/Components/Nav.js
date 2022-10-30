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

    return (
        <nav className='nav-ctn'>
            <div className='logo'>
                <p>MyFi.</p>
            </div>
            <ul>
                <Link className='link-ctn' to='/'>Home</Link>
                <Link className='link-ctn' to='/about'>About</Link>
                {!user && <Link className='link-ctn' to='/login'>Log in</Link>}
                <div onClick={() => { setShowDropdown(!showDropdown) }} className='link-ctn user'>{user?.displayName?.split(' ')[0]}
                    {user && <img src={user?.photoURL || ""} style={{ borderRadius: '50px', height: '35px' }}></img>}
                    {showDropdown &&
                        <ul className='dropdown-ctn'>
                            <li onClick={() => { handleSignOut() }}>Sign Out</li>
                            <li>Settings</li>
                        </ul>}
                </div>
            </ul>
        </nav >
    )
}

export default Nav