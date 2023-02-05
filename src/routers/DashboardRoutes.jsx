import React from 'react';
import { Routes, Route } from "react-router-dom";
import ConBuscar from '../components/ConBuscar';
import DetallePicker from '../components/DetallePicker';
import { Navbar } from '../components/Navbar';

const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div className="container">
            <Routes>
                <Route path="" element={<ConBuscar />} />
                <Route path="picker/:userid" element={<DetallePicker />} />
            </Routes>  
            </div>
        </>
    )
}

export default DashboardRoutes
