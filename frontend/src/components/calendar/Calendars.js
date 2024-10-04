import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarContext } from '../../context/CalendarContext';
import CalendarModal from './CalendarModal';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import the trash and edit icons

const Calendars = () => {
    const { calendars, addCalendar, updateCalendar, selectCalendar, removeCalendar } = useContext(CalendarContext); // Include updateCalendar
    const [calendarModalVisible, setCalendarModalVisible] = useState(false);
    const [editCalendar, setEditCalendar] = useState(null); // Track the calendar to be edited
    const navigate = useNavigate();

    const openCalendarModal = () => {
        setCalendarModalVisible(true);
        setEditCalendar(null); // Reset the edit calendar to null for adding a new calendar
    };

    const closeCalendarModal = () => {
        setCalendarModalVisible(false);
    };

    const handleSaveCalendar = (title, details) => {
        if (editCalendar) {
            editCalendar.title = title;
            editCalendar.details = details;
            // Update the existing calendar
            updateCalendar(editCalendar);
        } else {
            // Add a new calendar
            addCalendar(title, details);
        }
        closeCalendarModal();
    };

    const handleSelectCalendar = (calendarId) => {
        // Set the selected calendar
        selectCalendar(calendarId);
        // Navigate to the daily calendar page with the calendar ID
        navigate(`/dailyCalendar/${calendarId}`);
    };

    const handleDeleteCalendar = (calendarId) => {
        // Remove the calendar using the context function
        removeCalendar(calendarId);
    };

    const handleEditCalendar = (calendar) => {
        setEditCalendar(calendar); // Set the calendar to be edited
        setCalendarModalVisible(true); // Open the modal in edit mode
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
                        <div key={calendar.id} className="relative bg-green-800 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            {/* Calendar Title - Click to navigate to daily calendar */}
                            <div
                                className="cursor-pointer flex-1"
                                onClick={() => handleSelectCalendar(calendar.id)} // Navigate with ID
                            >
                                {calendar.title}
                            </div>

                            {/* Edit and Delete Buttons */}
                            <div className="flex space-x-2">
                                {/* Edit Calendar Button */}
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent navigation
                                        handleEditCalendar(calendar); // Open modal for editing
                                    }}
                                >
                                    <FaEdit size={18} />
                                </button>

                                {/* Delete Calendar Button */}
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent the click event from navigating to the calendar
                                        handleDeleteCalendar(calendar.id);
                                    }}
                                >
                                    <FaTrashAlt size={18} />
                                </button>
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
                calendar={editCalendar} // Pass the calendar to be edited to the modal
            />
        </div>
    );
};

export default Calendars;
