import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import LoginScreen from "../auth/LoginScreen";
import DashboardRoutes from "./DashboardRoutes";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";

const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])
    

    if ( status === 'checking') {
        return (
           <h3>Cargando...</h3> 
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                {
                    status === 'not-authenticated'
                    ? (
                        <>
                            <Route path="/*" element={<Navigate to="/auth/login"/> } />
                            <Route path="/auth/login" element={<LoginScreen />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/auth/login" element={<Navigate to="/"/> } />
                            <Route path="/*" element={<DashboardRoutes />} />
                        </>
                    )
                }
            </Routes>  
        </BrowserRouter>
    )
}

export default AppRouter