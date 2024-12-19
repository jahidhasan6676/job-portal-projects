import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../firebase/firebaseConfig';
import axios from 'axios';


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

// https://job-portal-projects-server.vercel.app/
    useEffect(()=> {
       const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            console.log('state captured', currentUser?.email)
            if(currentUser?.email){
                const user = {email: currentUser.email};
                axios.post("https://job-portal-projects-server.vercel.app/jwt", user, {withCredentials:true})
                .then(res=> {
                console.log("login",res.data);
                setLoading(false);
            })
            }
            else{
                axios.post("https://job-portal-projects-server.vercel.app/logout", {}, {
                    withCredentials: true
                })
                .then(res => {
                console.log("logout", res.data);
                setLoading(false);
            })
            }
            
           
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