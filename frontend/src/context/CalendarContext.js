import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create a context for calendars
export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
    const [calendars, setCalendars] = useState([]);
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


    const addMeeting = (calendarId, meeting) => {
        const newMeeting = {
            id: meeting.id || uuidv4(),
            title: meeting.title,
            details: meeting.details,
            day: meeting.day,
            hour: meeting.hour
        };
    
        // Update calendars with a new meeting
        setCalendars((prevCalendars) => 
            prevCalendars.map((calendar) => {
                if (calendar.id === calendarId) {
                    return {
                        ...calendar,
                        meetings: [...calendar.meetings, newMeeting], // Add new meeting
                    };
                }
                return calendar;
            })
        );
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
                selectedCalendar,
                addCalendar,
                selectCalendar,
                addMeeting
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};
