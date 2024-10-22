import React, {  createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase';


const Profile=createContext()

export default function ProfileContext({children}) {
    const {user}=useAuthContext()
    const[data,setdata]=useState("")

    const readProfile = useCallback(async () => {
        try {
            const docRef = doc(firestore, "Users", user?.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                // const fullname=data.fullname
                // const id=data.userId
                // const photo=data.photo
                
                // const email=data.email
                // const form={fullname,email,id,photo}

                
                
                setdata(s => ({ ...s, ...data }))
                console.log(data.firstname);
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log("Error fetching profile data:", error);
        }
    }, [user?.uid]);
    useEffect(()=>{
        readProfile();
    },[readProfile])
  return (
    <Profile.Provider value={{data,readProfile}}>
        {children}
    </Profile.Provider>
  )
}

export const useProfileContext=()=>useContext(Profile)
