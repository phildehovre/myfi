import React from 'react'
import './Login.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { auth } from '../Config/firebase'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { createPortfolio } from '../Util/db'

const schema = yup.object().shape({
    firstName: yup.string().required('Your first name is required'),
    lastName: yup.string().required('Your last name is required'),
    email: yup.string().email().required('Your last name is required'),
    password: yup.string().min(8).required('You must choose a password'),
    confirmPassword: yup.string().oneOf([yup.ref("password")], 'Your passwords must match'),
})

function Signup() {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth)

    const onSubmit = (data) => {
        createUserWithEmailAndPassword(data.email, data.password)
        createPortfolio(auth.currentUser.uid, ['TSLA', 'PG'])
    }

    return (
        <div className='login_form-ctn' >
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className='form-error'>{errors.firstName?.message}</label>
                <input
                    {...register('firstName')}
                    placeholder='Enter your first name'
                    name='firstName'
                    type='text'></input>
                <label className='form-error'>{errors.lastName?.message}</label>
                <input
                    {...register('lastName')}
                    placeholder='Enter your last name'
                    name='lastName'
                    type='text'></input>
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
                <label className='form-error'>{errors.confirmPassword?.message}</label>
                <input
                    {...register('confirmPassword')}
                    placeholder='Confirm your password'
                    name='confirmPassword'
                    type='password'></input>
                <button className='login-btn' type='submit'>{loading ? 'Loading...' : 'Sign up!'}</button>
            </form>
        </div>
    )
}

export default Signup