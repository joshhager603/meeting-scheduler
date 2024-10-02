import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Participants from './components/participant/Participants';
import Calendars from './components/calendar/Calendars';
import WeeklyCalendar from './components/calendar/ WeeklyCalendar';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar />

                {/* Main Content */}
                <div className="container mx-auto p-4">
                    <Routes>
                        <Route path="/participants" element={<Participants />} />
                        <Route path="/calendars" element={<Calendars />} />
                        <Route path="/weeklyCalendar/:id" element={<WeeklyCalendar />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
