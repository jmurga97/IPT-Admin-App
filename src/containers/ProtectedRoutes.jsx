import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";


// Outlet es un componente que renderiza el siguiente componente hijo en rutas anidadas
// Para evitar que la app se rompa al utilizar rutas anidadas y para reusar el componente ProtectedRoutes
//   se verifica si hay un children directo o un grupo de rutas definidas por Outlet

const ProtectedRoute = ({user,children,isAllowed}) => {
    const {pathname} = useLocation()

    if(user && pathname === '/signin'){
        return<Navigate to='/' replace/>
    }
    if(!user && pathname !== '/signin'){
        return <Navigate to='/signin' replace/>
    }
    if(pathname === '/tickets' && !isAllowed){
        return <Navigate to='/' replace/>
    }
    return children ? children : <Outlet/>
}

export default ProtectedRoute;
