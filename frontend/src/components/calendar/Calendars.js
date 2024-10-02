import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarContext } from '../../context/CalendarContext';
import CalendarModal from './CalendarModal';
import { FaTrashAlt } from 'react-icons/fa'; // Import the trash icon

const Calendars = () => {
    const { calendars, addCalendar, selectCalendar, removeCalendar } = useContext(CalendarContext); // Include removeCalendar
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
        // Set the selected calendar
        selectCalendar(calendarId);
        // Navigate to the weekly calendar page with the calendar ID
        navigate(`/weeklyCalendar/${calendarId}`);
    };

    const handleDeleteCalendar = (calendarId) => {
        // Remove the calendar using the context function
        removeCalendar(calendarId);
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
                        <div key={calendar.id} className="relative bg-green-800 text-white p-4 rounded-lg shadow-md">
                            {/* Delete Calendar Button (positioned at top-right corner) */}
                            <button
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent the click event from navigating to the calendar
                                    handleDeleteCalendar(calendar.id);
                                }}
                            >
                                <FaTrashAlt size={18} />
                            </button>

                            {/* Calendar Title - Click to navigate to weekly calendar */}
                            <div
                                className="cursor-pointer"
                                onClick={() => handleSelectCalendar(calendar.id)} // Navigate with ID
                            >
                                {calendar.title}
                            </div>
                        </div>
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
