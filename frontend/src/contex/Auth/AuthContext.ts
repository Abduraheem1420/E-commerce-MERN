import { createContext, useContext } from "react";

interface AuthContextType{
    userName : string | null;
    token : string | null;
    isAuthenticated : boolean;

    login : (userName : string , token : string)=>void;
    logOut : () => void;
}

export const AuthContext = createContext<AuthContextType>({
    userName : null ,
     token : null ,
      login : () => {} ,
      logOut : () => {} ,
       isAuthenticated : false});

export const useAuth = () => useContext(AuthContext);