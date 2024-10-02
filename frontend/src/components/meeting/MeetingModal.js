import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../context/CalendarContext';
import { Link, useNavigate } from 'react-router-dom';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hours = [...Array(24).keys()];

const MeetingModal = ({ show, onClose, calendarId, meeting, day: initialDay, hour: initialHour }) => {
    const { addMeeting, selectCalendar } = useStateContext();
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [selectedDay, setSelectedDay] = useState(initialDay || 'Sunday');
    const [selectedHour, setSelectedHour] = useState(initialHour || 0);
    const [errors, setErrors] = useState({ title: '', details: '' });
    const navigate = useNavigate();


    // Effect to update the modal state when the `meeting` prop changes
    useEffect(() => {
        if (meeting) {
            setTitle(meeting.title);
            setDetails(meeting.details);
            setSelectedDay(meeting.day);
            setSelectedHour(meeting.hour);
        } else {
            setTitle('');
            setDetails('');
            setSelectedDay(initialDay || 'Sunday');
            setSelectedHour(initialHour || 0);
        }
    }, [meeting, initialDay, initialHour]);

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
            const newMeeting = {
                id: meeting?.id || undefined, // UUID will be generated in context if not provided
                title,
                details,
                day: selectedDay,
                hour: selectedHour,
            };

           const response =  addMeeting(calendarId, newMeeting);
            selectCalendar(calendarId);
            onClose();
            return response;
        }
    };

    const handleMeetingClick =()=>{
        if(meeting){
         navigate(`/meeting/${meeting.id}`);
         return;
        }

        const newMeeting = handleSubmit();
        if(newMeeting){
            navigate(`/meeting/${newMeeting.id}`);
        }
        
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">{meeting ? 'Edit Meeting' : 'Create Meeting'}</h2>

                <div className="mb-4">
                    <label className="block font-bold">Title:</label>
                    <input
                        className="border p-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-bold">Details:</label>
                    <textarea
                        className="border p-2 w-full"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                    {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details}</p>}
                </div>

                {/* Day and Hour selection */}
                <div className="mb-4">
                    <label className="block font-bold">Day:</label>
                    <select
                        className="border p-2 w-full"
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                    >
                        {days.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block font-bold">Hour:</label>
                    <select
                        className="border p-2 w-full"
                        value={selectedHour}
                        onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                    >
                        {hours.map((hour) => (
                            <option key={hour} value={hour}>
                                {`${hour}:00`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                {<button className="bg-blue-500 text-white px-4 py-2 rounded"  onClick={handleMeetingClick}>Add Participants</button> }
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

export default MeetingModal;
