import React, { useContext, useEffect, useState } from 'react';
import MeetingModal from '../meeting/MeetingModal';
import { useStateContext } from '../../context/CalendarContext';
import { useNavigate } from 'react-router-dom';

const hours = [...Array(24).keys()];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WeeklyCalendar = () => {
  const { selectedCalendar } = useStateContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedHour, setSelectedHour] = useState('');

  useEffect(() => {
    if (selectedCalendar) {
      console.log('Meetings updated:', selectedCalendar.meetings);
    }
  }, [selectedCalendar?.meetings]);

  const handleTimeSlotClick = (day, hour) => {
    const existingMeetings = selectedCalendar?.meetings?.filter(
      (meet) => meet.day === day && meet.hour === hour
    );
    setCurrentMeeting(existingMeetings.length === 1 ? existingMeetings[0] : null);
    setSelectedDay(day);
    setSelectedHour(hour);
    setModalVisible(true);
  };

  if (!selectedCalendar) {
    return <p>No calendar selected</p>;
  }

  const handleOnClose = () => {
    setModalVisible(false);
    setCurrentMeeting(null);
  };

  return (
    <div>
      {/* Button to open modal for adding a new meeting */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setCurrentMeeting(null);  // No existing meeting, so this is for creating a new meeting
          setModalVisible(true);
        }}
      >
        Add Meeting
      </button>

      <div className="grid grid-cols-8 gap-2 p-4">
        <div></div>
        {days.map((day) => (
          <div key={day} className="font-bold">{day}</div>
        ))}

        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="font-bold">{`${hour}:00`}</div>
            {days.map((day) => {
              const meetingForSlot = selectedCalendar?.meetings?.find(
                (meet) => meet.day === day && meet.hour === hour
              );

              return (
                <div
                  key={`${day}-${hour}`}
                  className={`border p-4 hover:bg-blue-100 cursor-pointer ${
                    meetingForSlot ? 'bg-blue-200' : ''
                  }`}
                  onClick={() => handleTimeSlotClick(day, hour)}
                >
                  {meetingForSlot ? (
                    <div>
                      <span className="font-bold">{meetingForSlot.title}</span>
                    </div>
                  ) : ""}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Render the MeetingModal */}
      <MeetingModal
        show={modalVisible}
        onClose={handleOnClose}
        calendarId={selectedCalendar.id}
        meeting={currentMeeting}
        day={selectedDay}
        hour={selectedHour}
      />
    </div>
  );
};

export default WeeklyCalendar;
