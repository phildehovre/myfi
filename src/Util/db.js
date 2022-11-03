import { db } from "../Config/firebase";
import { getDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth } from '../Config/firebase'


export const getUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().portfolio
    }

    if (!docSnap.exists()) {
        console.log("No such document!");
    }
}

export const addInstrument = async (uid, ticker) => {
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)

    if (!ticker) return

    if (docSnap.exists()) {
        updateDoc(docRef, { portfolio: arrayUnion(ticker) })
    } else {
        setDoc(docRef, { 'portfolio': [ticker] })
    }
}

export const createPortfolio = async (uid, ticker) => {
    const res = await setDoc(doc(db, 'users', uid), {
        portfolio: ticker
    }, { merge: true })
}

export const fetchPortfolio = async (uid) => {
    const res = await getDoc(doc(db, 'users', uid), {
    })

    return res.data()
}

