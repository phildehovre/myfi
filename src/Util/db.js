import { db } from "../Config/firebase";
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../Config/firebase'


export const getUser = async (user) => {
    const res = await getDoc(doc(db, 'users', user))
}

export const addInstrument = async (uid, tickers = []) => {
    const res = await updateDoc(doc(db, 'users', uid), { portfolio: [...tickers] })
}

export const createPortfolio = async (uid, tickers = []) => {
    const res = await setDoc(doc(db, 'users', uid), {
        portfolio: [...tickers]
    })
}

export const fetchPortfolio = async (uid) => {
    const res = await getDoc(doc(db, 'users', uid), {
    })
}

