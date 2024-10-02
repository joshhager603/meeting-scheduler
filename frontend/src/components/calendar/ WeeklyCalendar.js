import React, { useContext, useEffect, useState } from 'react';
import MeetingModal from '../meeting/MeetingModal';
import { useStateContext } from '../../context/CalendarContext';

const hours = [...Array(24).keys()];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WeeklyCalendar = () => {
    const { selectedCalendar } = useStateContext(); // Access selected calendar from context
    const [modalVisible, setModalVisible] = useState(false);
    const [currentMeeting, setCurrentMeeting] = useState(null);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedHour, setSelectedHour] = useState('');

    // Listen for updates to selectedCalendar.meetings
    useEffect(() => {
        if (selectedCalendar) {
            console.log('Meetings updated:', selectedCalendar.meetings);
        }
    }, [selectedCalendar?.meetings]);

    const handleTimeSlotClick = (day, hour) => {
        // Find if there are any meetings for the clicked slot
        const existingMeetings = selectedCalendar?.meetings?.filter(
            (meet) => meet.day === day && meet.hour === hour
        );

        // If there's only one meeting, pre-select it for editing
        setCurrentMeeting(existingMeetings.length === 1 ? existingMeetings[0] : null);
        setSelectedDay(day);
        setSelectedHour(hour);
        setModalVisible(true); // Show the modal
    };

    if (!selectedCalendar) {
        return <p>No calendar selected</p>;
    }

    const handleOnClose = ()=>{
        setModalVisible(false)
        setCurrentMeeting(null)
    }

    

    return (
        <div className="grid grid-cols-8 gap-2 p-4">
            <div></div>
            {days.map((day) => (
                <div key={day} className="font-bold">{day}</div>
            ))}

            {hours.map((hour) => (
                <React.Fragment key={hour}>
                    <div className="font-bold">{`${hour}:00`}</div>
                    {days.map((day) => {
                        // Safely access calendarMeetings to avoid errors if it's undefined
                        const meetingForSlot = selectedCalendar?.meetings?.find(
                            (meet) => meet.day === day && meet.hour === hour
                        );

                        return (
                            <div
                                key={`${day}-${hour}`}
                                className="border p-4 hover:bg-blue-100 cursor-pointer"
                                onClick={() => handleTimeSlotClick(day, hour)}
                            >
                                {/* Display the meeting title if a meeting exists for the slot */}
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
