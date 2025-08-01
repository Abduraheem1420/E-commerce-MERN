import { useState, type FC, type PropsWithChildren } from "react";
import {AuthContext} from "./AuthContext";

const USERNAME_KEY = 'userName';
const TOKEN_KEY = 'token';

const AuthProvider : FC<PropsWithChildren> = ( {children}) =>{

    const [userName , setUserName] = useState< string | null>(localStorage.getItem(USERNAME_KEY));
    const [token , setToken] = useState< string | null>(localStorage.getItem(TOKEN_KEY));
    const login = (userName : string , token : string) =>{
        setUserName(userName);
        setToken(token);
        localStorage.setItem(USERNAME_KEY , userName);
        localStorage.setItem(TOKEN_KEY , token);
    }
    const isAuthenticated = !!token;

    const logOut = () =>{
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setUserName(null);
        setToken(null);
    }



    return(
        <AuthContext.Provider value={{userName , token , login , logOut  ,  isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;