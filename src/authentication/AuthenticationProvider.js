import { createContext, useState } from "react";

const AuthentcationContext = createContext({});

export const AuthenticationProvider = ({ children })=>{
    const[auth, setAuth] = useState({});

    return (
        <AuthentcationContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthentcationContext.Provider>
    )
}

export default AuthentcationContext;