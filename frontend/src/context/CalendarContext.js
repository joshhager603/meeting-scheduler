import React, { createContext, useContext, useEffect, useState } from 'react';
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
            hour: meeting.hour,
        };
    
        // Update the calendars with the new meeting
        setCalendars((prevCalendars) => {
            const updatedCalendars = [...prevCalendars];
            
            updatedCalendars.forEach((calendar) => {
                if (calendar.id === calendarId) {
                    calendar.meetings.push(newMeeting); // Push new meeting directly
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

export const useStateContext = () => {
    return useContext(CalendarContext);
  };
  
  export default CalendarProvider;
