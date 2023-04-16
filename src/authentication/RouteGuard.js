import { UserContext } from '../App'
import React, { useContext } from "react"

export const RouteGuardEmployee = ({ redirectPath = '/login', children, }) => {
    const { user } = useContext(UserContext)
     if (user === null || user.roles.includes("PATIENT")) 
     window.location.href = redirectPath; 
     return children; 
    }
    
// export const RouteGuardBusiness = ({ redirectPath = '/account/logout', children, }) => {
//     if (RetrieveToken() == null) {
//         alert('No authentication found!')
//         window.location.href = redirectPath;
//     } const accType = parseJwt(RetrieveToken()).user.accountType;
//     if (accType != "BUSINESS") {
//         alert('Not authorized')
//         window.location.href = redirectPath;
//     } return children;
//}