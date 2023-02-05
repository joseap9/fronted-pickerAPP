import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import LoginScreen from "../auth/LoginScreen";
import DashboardRoutes from "./DashboardRoutes";
import { getEnvVariables } from '../helpers/getEnvVariables'

const AppRouter = () => {

    const authStatus = 'no-authenticated';

    console.log(getEnvVariables());
    return (
        <BrowserRouter>
            <Routes>
                {
                    authStatus === 'not-authenticated'
                    ? <Route path="/login" element={<LoginScreen />} />
                    : <Route path="/*" element={<DashboardRoutes />} />
                }
                <Route path="/*" element={<Navigate to="/login"/> } />
            </Routes>  
        </BrowserRouter>
    )
}

export default AppRouter