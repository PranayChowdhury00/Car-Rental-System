import React, { createContext, useEffect, useState } from 'react';
import {GoogleAuthProvider,  createUserWithEmailAndPassword,signInWithEmailAndPassword, signInWithPopup,signOut,onAuthStateChanged } from "firebase/auth";
import auth from '../FireBase/firebase';
import axios from 'axios';
export const AuthContext = createContext(null);
const GoogleProvider = new GoogleAuthProvider();
const AuthProvider = ({children,theme}) => {
    const [user,setUser]=useState(null);
    const [loader,setLoader]=useState(true);

    const createNewUser = (email,password)=>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signInUser = (email,password)=>{
        setLoader(true)
        return signInWithEmailAndPassword(auth,email,password);
    }
    const googleSignIn=()=>{
        setLoader(true);
        return signInWithPopup(auth,GoogleProvider);
    }

    const signOutUser = ()=>{
        setLoader(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            // console.log('state capture',currentUser?.email);
            if(currentUser?.email){
                const user = {email:currentUser.email}
                axios.post('https://carrent-eight.vercel.app/jwt',user,{
                    withCredentials:true
                })
                .then(res=>{
                    // console.log(res.data);
                    setLoader(false)
                 })
            }
            else{
                axios.post('https://carrent-eight.vercel.app/logout',{},{
                    withCredentials:true
                    
                })
                .then(res=>{
                    // console.log('logout',res.data);
                    setLoader(false)

                })
            }

            
        })
        return ()=>unsubscribe();
    },[])

    const authInfo = {
        user,
        loader,
        theme,
        createNewUser,
        signInUser,
        googleSignIn,
        signOutUser,
        setLoader

    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;