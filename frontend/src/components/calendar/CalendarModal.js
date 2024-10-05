import React, { useState, useEffect } from 'react';

const CalendarModal = ({ show, onClose, onSave, calendar }) => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');

    useEffect(() => {
        if (calendar) {
            // Pre-fill the modal with the calendar's current data when editing
            setTitle(calendar.title);
            setDetails(calendar.details);
        } else {
            setTitle('');
            setDetails('');
        }
    }, [calendar]);

    if (!show) return null;

    const handleSubmit = () => {
        if (title.trim() && details.trim()) {
            onSave(title, details);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">{calendar ? 'Edit Calendar' : 'Add Calendar'}</h2>

                <div className="mb-4">
                    <label className="block font-bold">Title:</label>
                    <input
                        className="border p-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-bold">Details:</label>
                    <textarea
                        className="border p-2 w-full"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                        {calendar ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarModal;
