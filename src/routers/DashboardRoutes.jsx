import React from 'react';
import { Routes, Route } from "react-router-dom";
import AsistenciaPicker from '../components/AsistenciaPicker';
import ConBuscar from '../components/ConBuscar';
import DailyReport from '../components/DailyReport';
import DetallePicker from '../components/DetallePicker';
import { Navbar } from '../components/Navbar';
import LastDayReport from '../components/reports/LastDayReport';
import MonthReport from '../components/reports/MonthReport';
import WeekReport from '../components/reports/WeekReport';

const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div style={{ width: '100%', margin: 0, padding: 0 }}>
            <Routes>
                <Route path="" element={<DailyReport />} />
                <Route path="daily" element={<DailyReport />} />
                <Route path="last-day" element={<LastDayReport />} />
                <Route path="last-seven-days" element={<WeekReport />} />
                <Route path="last-thirty-days" element={<MonthReport />} />
                
                <Route path="/busqueda" element={<AsistenciaPicker />} />
                <Route path="/pagos" element={<ConBuscar />} />
                <Route path="picker/:userid" element={<DetallePicker />} />
            </Routes>  
            </div>
        </>
    )
}

export default DashboardRoutes
