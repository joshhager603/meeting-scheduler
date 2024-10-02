import React, { useState, useContext } from 'react';
import { CalendarProvider, CalendarContext } from './context/CalendarContext';
import CalendarModal from './components/calendar/CalendarModal';
import WeeklyCalendar from './components/calendar/ WeeklyCalendar';

const App = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { calendars, selectedCalendar, selectCalendar, addCalendar } = useContext(CalendarContext);

    const openModalToCreateCalendar = () => {
        setModalVisible(true);
    };

    const handleSelectCalendar = (calendar) => {
        selectCalendar(calendar.id);
    };

    const handleSaveCalendar = (title, details) => {
        addCalendar(title, details);
        setModalVisible(false);
    };

    return (
        <>
            {selectedCalendar ? (
                <div>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={() => selectCalendar(null)}
                    >
                        Back to Calendars
                    </button>
                    <h2 className="text-2xl font-bold mb-4">{selectedCalendar.title}</h2>
                    <WeeklyCalendar />
                </div>
            ) : (
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold mb-4">Calendars</h2>
                        <button
                            className="bg-blue-500 text-white p-2 rounded-lg"
                            onClick={openModalToCreateCalendar}
                        >
                            Create Calendar
                        </button>
                    </div>
                    {calendars.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {calendars.map((calendar) => (
                                <button
                                    key={calendar.id}
                                    className="bg-blue-500 text-white p-4 rounded-lg"
                                    onClick={() => handleSelectCalendar(calendar)}
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
                </div>
            )}
            <CalendarModal
                show={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveCalendar}
            />
        </>
    );
};

export default App;
