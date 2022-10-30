
import React from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { auth, provider } from '../Config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


function Login() {

    const schema = yup.object().shape({
        email: yup.string().email().required('Your last name is required'),
        password: yup.string().min(8).required('You must choose a password'),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const navigate = useNavigate()
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth)

    const onSubmit = ({ email, password }) => {
        signInWithEmailAndPassword(email, password)
        navigate('/')

    }

    const handleSignupWithGoogle = async () => {
        const res = await signInWithPopup(auth, provider)
        navigate('/')
    }

    return (
        <div className='login_form-ctn' >
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className='form-error'>{errors.email?.message}</label>
                <input
                    {...register('email')}
                    placeholder='Enter your email'
                    name='email'
                    type='text'></input>
                <label className='form-error'>{errors.password?.message}</label>
                <input
                    {...register('password')}
                    placeholder='Enter your password'
                    name='password'
                    type='password'></input>
                <button className='login-btn' type='submit'>Log in</button>
                <div className='login-btn' onClick={e => { handleSignupWithGoogle() }}>
                    Log in with Google
                    <FontAwesomeIcon icon={faGoogle} size='xl' />
                </div>
                <div>
                    <span>Not a member yet? </span><Link to='/signup'>Sign up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login