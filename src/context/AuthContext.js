import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { auth } from '../config/firebase'

const Auth=createContext()

const initialstate={isAuthenticated:false,user:{}}

const reducer=(state,{type,payload})=>{
  switch(type){
    case "SET_LOGGED_IN":
      return {isAuthenticated:true,user:payload.user}
    case "SET_LOGGED_OUT":
      return {isAuthenticated:false,user:{}}
      case "SET_PROFILE":
      return { ...state, user: payload.user }

    default: return state
    
  }

}
export default function AuthContext({children}) {
    const [state,dispatch]=useReducer(reducer,initialstate)
    const [isAppLoading,setisAppLoading]=useState(true)
    const [user,setuser]=useState()

    const readprofile=useCallback(()=>{
      setTimeout(() => {
        setisAppLoading(false)
      }, 1000);
    },[])

    useEffect(()=>{
      readprofile()

      onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch({type:"SET_LOGGED_IN",payload:{user}})

            setuser(user)
    
        //   const uid = user.uid;
          
        } else {
            dispatch({type:"SET_LOGGED_OUT"})
        }
      });
    },[readprofile])

    const handleLogout=()=>{
      signOut(auth)
            .then(() => {
                // console.log("Logout")
                dispatch({ type: "SET_LOGGED_OUT" })
                window.toastify("Logout Successfully", "success")
            }).catch((error) => {
                console.error("Logout Error=>",error)
                // An error happened.
            });

    }
  return (
    <Auth.Provider value={{...state,isAppLoading,setisAppLoading,dispatch,handleLogout,user}}>
        {children}
    </Auth.Provider>
  )
}
export const useAuthContext = () => useContext(Auth)
