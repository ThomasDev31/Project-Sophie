import { createContext, useEffect, useState } from "react";



export const AuthContext  = createContext();

export const AuthProvider = ({children}) => {

    const  [token, setToken] = useState(localStorage.getItem('token'));

    const login = (newToken) =>  {
        localStorage.setItem('token', newToken);
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null);
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if(storedToken !== token){
            setToken(storedToken);
        }
    }, [token])

    return(
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}