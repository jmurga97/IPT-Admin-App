import React from 'react';
import { Navigate, useLocation } from "react-router-dom";


const ProtectedRoute = ({user,children}) => {
    const {pathname} = useLocation()

    if(user && pathname === '/signin'){
        return<Navigate to='/' replace/>
    }
    if(!user && pathname !== '/signin'){
        return <Navigate to='/signin' replace/>
    }
    return children
}

export default ProtectedRoute;
