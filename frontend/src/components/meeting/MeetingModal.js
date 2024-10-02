import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // For time picker
import 'react-datepicker/dist/react-datepicker.css';
import { useStateContext } from '../../context/CalendarContext';

const MeetingModal = ({ show, onClose, date }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const { addMeeting, selectedCalendar } = useStateContext();


  const handleSubmit = () => {
    const newMeeting = {
      title,
      date: date.toISOString().split('T')[0],  // Convert date to 'yyyy-MM-dd'
      time: time.toTimeString().split(' ')[0], // Convert time to 'HH:mm:ss'
      location,
      details,
    };
    addMeeting(selectedCalendar.id, newMeeting);  
    onClose(); 
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Create New Meeting</h2>

        <div className="mb-4">
          <label className="block font-bold">Title:</label>
          <input
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold">Time:</label>
          <DatePicker
            selected={time}
            onChange={(date) => setTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold">Location:</label>
          <input
            className="border p-2 w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingModal;
