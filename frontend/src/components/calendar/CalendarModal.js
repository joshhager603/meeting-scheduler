import React, { useContext, useState } from 'react';
import { useStateContext } from '../../context/CalendarContext';

const CalendarModal = ({ show, onClose}) => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [errors, setErrors] = useState({ title: '', details: '' });
    const {selectCalendar, addCalendar } = useStateContext();

    if (!show) return null;

    const validateForm = () => {
        let valid = true;
        const newErrors = { title: '', details: '' };

        if (title.trim() === '') {
            newErrors.title = 'Title is required.';
            valid = false;
        }

        if (details.trim() === '') {
            newErrors.details = 'Details are required.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            addCalendar(title, details);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Create Calendar</h2>

                <div className="mb-4">
                    <label className="block font-bold">Title:</label>
                    <input
                        className="border p-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block font-bold">Details:</label>
                    <textarea
                        className="border p-2 w-full"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                    {errors.details && (
                        <p className="text-red-500 text-sm mt-1">{errors.details}</p>
                    )}
                </div>

                <div className="flex justify-end space-x-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarModal;
