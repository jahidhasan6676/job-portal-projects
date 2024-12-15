import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../firebase/firebaseConfig';


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();


    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);

    }

    const loginUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    const signInGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    useEffect(()=> {
       const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
           
        })
        return () =>{
            unsubscribe();
        }
    },[])

    const authInfo = {
        user,
        setUser,
        setLoading,
        createUser,
        loginUser,
        logOut,
        signInGoogle,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;