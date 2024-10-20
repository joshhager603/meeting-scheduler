import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context for calendars
export const CalendarContext = createContext();

const api_uri = 'http://localhost:8000/api/';

export const CalendarProvider = ({ children }) => {
    const [calendars, setCalendars] = useState([]);
    const [participants, setParticipants] = useState([]); 
    const [selectedCalendar, setSelectedCalendar] = useState(null);

      // UseEffect to fetch calendars and participants when component mounts
      useEffect(() => {
        fetchCalendars();
    }, []); 

    const sendRequest = async (data, method, endpoint = "calendars/") => {
        try {
            const options = {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            // Only include body for POST and PUT requests
            if (method === "POST" || method === "PUT") {
                options.body = JSON.stringify(data);
            }
    
            const response = await fetch(`${api_uri}${endpoint}`, options);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Check if response has a body (DELETE requests often don't)
            if (method !== "DELETE") {
                const result = await response.json(); // Try parsing as JSON
                return result;
            } else {
                return {}; // Return an empty object for DELETE requests
            }
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            return null; // Return null in case of error
        }
    };


            // Function to fetch a specific meeting by ID
        const fetchMeeting = async (meetingId) => {
            const meeting = await sendRequest({}, "GET", `meetings/${meetingId}/`);
            return meeting;
        };

        // Fetch all calendars and populate meetings and participants
        const fetchCalendars = async () => {
            const result = await sendRequest({}, "GET", "calendars/");
            if (result)
                setCalendars(result)
        };


    // Add a new calendar
    const addCalendar = async (title, details) => {
        const newCalendar = {
            title,
            details,
            meetings: [],
        };

        const result = await sendRequest(newCalendar, "POST");
        if (result) {
           await fetchCalendars();
        } else {
            alert("Failed to add calendar");
        }
    };

    // Update an existing calendar by passing the updated calendar object
    const updateCalendar = async (updatedCalendar) => {
        const result = await sendRequest(updatedCalendar, "PUT", `calendars/${updatedCalendar.id}/`);
        if (result) {
            await fetchCalendars(); // Fetch all calendars again after updating
        } else {
            alert("Failed to update calendar");
        }
    };


    // Remove a calendar
    const removeCalendar = async (calendarId) => {
        await sendRequest({}, "DELETE", `calendars/${calendarId}/`);
        await fetchCalendars();
    };

    // Add a new participant
    const addParticipant = async (name, email, meeting_id) => {
        const newParticipant = {
            name,
            email,
            meeting_id,
        };

     const result =  await sendRequest(newParticipant, "POST", "participants/");
     await fetchCalendars();
    };

    // Remove a participant
    const removeParticipant = async (participantId) => {
        await sendRequest({}, "DELETE", `participants/${participantId}/`);
       await  fetchCalendars();
    };

    // Update an existing participant
    const updateParticipant = async (participantId, name, email) => {
        const updatedParticipant = {
            name,
            email
        };

        await sendRequest(updatedParticipant, "PUT", `participants/${participantId}/`);
        fetchCalendars();
        
    };

    // Remove a participant from a meeting
    const deleteParticipant = async(participantId) => {
        await sendRequest({}, "DELETE", `participants/${participantId}/`)
    };

   // Add a meeting and update the corresponding calendar
    const addMeeting = async (calendarId, meeting) => {
        const newMeeting = {
            title: meeting.title,
            details: meeting.details,
            date: meeting.date,
            time: meeting.time,
            location: meeting.location,
            calendar_id: calendarId
        };

        // Step 1: Create the meeting
        await sendRequest(newMeeting, "POST", `meetings/`);
        fetchCalendars()
    };

        // Update an existing meeting
        const updateMeeting = async (meeting) => {
            await sendRequest(meeting, "PUT", `meetings/${meeting.id}/`);
            fetchCalendars();
    
        };


    // Remove a meeting from a calendar
    const removeMeeting = async (meetingId) => {
        await sendRequest({}, "DELETE", `meetings/${meetingId}/`);
        fetchCalendars()
    };

    // Select a calendar for viewing
    const selectCalendar = (calendarId) => {
        const calendar = calendars.find((cal) => cal.id === calendarId);
        setSelectedCalendar(calendar || null);
    };


    // Add a new attachment
    const addAttachment = async (url, meeting_id) => {
        const newAttachment = {
            url,
            meeting_id,
        };

      await sendRequest(newAttachment, "POST", "attachments/");
      await fetchCalendars();
    };

    // Remove a Attachment
    const removeAttachment = async (AttachmentId) => {
        await sendRequest({}, "DELETE", `attachments/${AttachmentId}/`);
        fetchCalendars();
    };

    // Update an existing Attachment
    const updateAttachment = async (AttachmentId, url) => {
        const updatedAttachment = {
            url
        };

        await sendRequest(updatedAttachment, "PUT", `attachments/${AttachmentId}/`);
        fetchCalendars();
        
    };

    // Remove a Attachment from a meeting
    const deleteAttachment = async(participantId) => {
        await sendRequest({}, "DELETE", `participants/${participantId}/`)
    };

    return (
        <CalendarContext.Provider
            value={{
                calendars,
                participants, 
                selectedCalendar,
                addCalendar,
                removeCalendar,
                selectCalendar,
                addMeeting,
                addParticipant, 
                removeMeeting,
                updateMeeting,
                removeParticipant,
                updateParticipant,
                updateCalendar,
                deleteParticipant,
                fetchMeeting,
                addAttachment,
                removeAttachment,
                updateAttachment,
                deleteAttachment

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
