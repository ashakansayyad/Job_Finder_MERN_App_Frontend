import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import { decodeToken } from 'react-jwt';
import { getUserData } from '../services/user';




export const UserContext = createContext();
export const UserProvider = ({children})=>{
const [isLoading,setIsLoading]= useState(true);
const [loggedUser,setLoggedUser] = useState(null);

    const fetchUserData =async()=>{
        try{
            const token = localStorage.getItem("token");
            if(!token){
                setIsLoading(false);
                return;
            }
            const decoded = decodeToken(token);
           if(!decoded){
            setIsLoading(false);
            return null
           }else{
            const userId = decoded?.id;
            console.log("decoded id: ",userId);
            const res = await getUserData(userId);
            setLoggedUser(res.data);
           }
    
        }catch(err){
            console.error(err);
        }finally{
            setIsLoading(false);
        }
    
    }

useEffect(()=>{
    fetchUserData();
},[])

    return(
        <UserContext.Provider  value={{loggedUser,setLoggedUser,isLoading}}>
            {children}
        </UserContext.Provider>
    )
}
