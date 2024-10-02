import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarContext } from '../../context/CalendarContext';
import CalendarModal from './CalendarModal';

const Calendars = () => {
    const { calendars, addCalendar } = useContext(CalendarContext);
    const [calendarModalVisible, setCalendarModalVisible] = useState(false);
    const navigate = useNavigate();

    const openCalendarModal = () => {
        setCalendarModalVisible(true);
    };

    const closeCalendarModal = () => {
        setCalendarModalVisible(false);
    };

    const handleSaveCalendar = (title, details) => {
        addCalendar(title, details);
        closeCalendarModal();
    };

    const handleSelectCalendar = (calendarId) => {
        // Navigate to the weekly calendar page with the calendar ID
        navigate(`/weeklyCalendar/${calendarId}`);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4">Calendars</h2>
                <button
                    className="bg-blue-500 text-white p-2 rounded-lg"
                    onClick={openCalendarModal}
                >
                    Add Calendar
                </button>
            </div>

            {/* List of Calendars */}
            {calendars.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    {calendars.map((calendar) => (
                        <button
                            key={calendar.id}
                            className="bg-green-800 text-white p-4 rounded-lg"
                            onClick={() => handleSelectCalendar(calendar.id)} // Navigate with ID
                        >
                            {calendar.title}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <p>No calendars available. Create a calendar to get started.</p>
                </div>
            )}

            {/* Calendar Modal */}
            <CalendarModal
                show={calendarModalVisible}
                onClose={closeCalendarModal}
                onSave={handleSaveCalendar}
            />
        </div>
    );
};

export default Calendars;
