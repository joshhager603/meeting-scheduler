import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create a context for calendars
export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
    const [calendars, setCalendars] = useState([]);
    const [participants, setParticipants] = useState([]); 
    const [selectedCalendar, setSelectedCalendar] = useState(null);

    // Add a new calendar
    const addCalendar = (title, details) => {
        const newCalendar = {
            id: uuidv4(),
            title,
            details,
            meetings: [],
        };
        setCalendars((prevCalendars) => [...prevCalendars, newCalendar]);
    };

    // Add a new participant
    const addParticipant = (name, email) => {
        const newParticipant = {
            id: uuidv4(),
            name,
            email,
        };

        setParticipants((prevParticipants) => [...prevParticipants, newParticipant]);
    };

    // Add participant to a meeting
    const assignParticipantToMeeting = (calendarId, meetingId, participantId) => {
        setCalendars((prevCalendars) => {
            const updatedCalendars = [...prevCalendars];

            updatedCalendars.forEach((calendar) => {
                if (calendar.id === calendarId) {
                    calendar.meetings.forEach((meeting) => {
                        if (meeting.id === meetingId) {
                            const participant = participants.find(p => p.id === participantId);
                            if (participant && !meeting.participants.includes(participant)) {
                                meeting.participants.push(participant); // Add the participant to the meeting
                            }
                        }
                    });
                }
            });

            return updatedCalendars;
        });
    };

    // Add a meeting
    const addMeeting = (calendarId, meeting) => {
        const newMeeting = {
            id: meeting.id || uuidv4(),
            title: meeting.title,
            details: meeting.details,
            day: meeting.day,
            hour: meeting.hour,
            participants: meeting.participants || [], // Initialize participants
        };

        setCalendars((prevCalendars) => {
            const updatedCalendars = [...prevCalendars];
            updatedCalendars.forEach((calendar) => {
                if (calendar.id === calendarId) {
                    calendar.meetings.push(newMeeting);
                }
            });

            return updatedCalendars;
        });
    };

    // Select a calendar for viewing
    const selectCalendar = (calendarId) => {
        const calendar = calendars.find((cal) => cal.id === calendarId);
        setSelectedCalendar(calendar || null);
    };

    return (
        <CalendarContext.Provider
            value={{
                calendars,
                participants, // Provide the participant list
                selectedCalendar,
                addCalendar,
                selectCalendar,
                addMeeting,
                addParticipant, // Function to add participants independently
                assignParticipantToMeeting, // Function to assign participants to meetings
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};

export const useStateContext = () => {
    return useContext(CalendarContext);
};

export default CalendarProvider;
