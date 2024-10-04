import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';  // Import useNavigate for navigation
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import { FaTrashAlt } from 'react-icons/fa';  // Import trash icon
import MeetingModal from '../meeting/MeetingModal'; // Import the MeetingModal component
import { useStateContext } from '../../context/CalendarContext';

const DailyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const {calendars, removeMeeting } = useStateContext(); // Import removeMeetingFromCalendar from context
  const navigate = useNavigate();  // Initialize navigation hook
  const[selectedCalendar, setSelectedCalendar] = useState(null)
  const {id} = useParams();

  useEffect(() => {
    if (id && calendars.length > 0) {
      const foundCalendar = calendars.find((calendar) => calendar.id === id);
      if (foundCalendar) {
        setSelectedCalendar(foundCalendar);  // Set the selected calendar
      }
    }
  }, [id, calendars]);  // Re-run the effect if `id` or `calendars` change  

  // Filter and sort meetings for the selected day by time
  const selectedDayMeetings = selectedCalendar?.meetings
    .filter((meet) => meet.date === format(selectedDate, 'yyyy-MM-dd'))
    .sort((a, b) => a.time.localeCompare(b.time));  // Sort by time in ascending order

  const handleMeetingClick = (meetingId) => {
    navigate(`/meeting/${meetingId}`);  // Navigate to the meeting details page
  };

  const handleDeleteMeeting = (meetingId) => {
    // Remove the meeting from the calendar
    removeMeeting(meetingId);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2 flex items-center">
          <span>Select Date:</span>
          {/* Date Picker for day selection */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            className="bg-gray-300 text-black px-2 py-1 rounded"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold">Meetings on {format(selectedDate, 'MMMM d, yyyy')}</h2>
        </div>
      </div>

      {/* Button to open modal for adding a new meeting */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setModalVisible(true)}  // Open modal to add a new meeting
      >
        Add Meeting
      </button>

      {/* List of meetings for the selected day */}
      <div className="p-4">
        {selectedDayMeetings?.length > 0 ? (
          selectedDayMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="relative border bg-blue-100 rounded-lg p-4 mb-4 shadow-md cursor-pointer"
              onClick={() => handleMeetingClick(meeting.id)}  // Navigate to the meeting details page
            >
              {/* Delete Meeting Button (positioned at top-right corner) */}
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from propagating to the parent div
                  handleDeleteMeeting(meeting.id);
                }}
              >
                <FaTrashAlt size={18} />
              </button>

              <h3 className="text-lg font-bold mb-2">{meeting.title}</h3>
              <p className="text-gray-700">
                <strong>Time:</strong> {meeting.time}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {meeting.location}
              </p>
              <p className="text-gray-700">
                <strong>Details:</strong> {meeting.details}
              </p>

              {/* Display Participants */}
              <div className="mt-4">
                <h4 className="font-bold mb-2">Participants:</h4>
                {meeting?.participants?.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {meeting.participants.map((participant, index) => (
                      <li key={index} className="text-gray-700">
                        {participant.name} - <a href={`mailto:${participant.email}`} className="text-blue-500">{participant.email}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No participants for this meeting.</p>
                )}
              </div>

              <div className="mt-4">
                <h4 className="font-bold mb-2">Attachments:</h4>
                {meeting?.attachments?.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {meeting.attachments.map((attachment, index) => (
                      <li key={index} className="text-gray-700">
                         <a target='_blank' href={`${attachment.url}`} className="text-blue-500">{attachment.url}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No participants for this meeting.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No meetings scheduled for this day.</p>
        )}
      </div>

      {/* Render the MeetingModal */}
      <MeetingModal
        show={modalVisible}
        onClose={() => setModalVisible(false)}  
        date={selectedDate} 
        calendarId={id}
      />
    </div>
  );
};

export default DailyCalendar;
