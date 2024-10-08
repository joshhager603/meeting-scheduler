import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Calendars from './components/calendar/Calendars';
import DailyCalendar from './components/calendar/DailyCalendar';
import Meeting from './components/meeting/Meeting';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<Calendars />} />
                        <Route path="/dailyCalendar/:id" element={<DailyCalendar />} />
                        <Route path="/meeting/:id" element={<Meeting />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
