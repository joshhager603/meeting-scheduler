import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../../context/CalendarContext';

const Meeting = () => {
    const { id } = useParams(); // Get the meeting ID from the URL
    const { selectedCalendar, assignParticipantToMeeting, removeParticipantFromMeeting, participants } = useStateContext();
    const [meeting, setMeeting] = useState(null);
    const [selectedParticipant, setSelectedParticipant] = useState('');
    const [currentParticipants, setCurrentParticipants] = useState([]);

    // Load the meeting details when the component is mounted
    useEffect(() => {
        if (selectedCalendar && id) {
            const foundMeeting = selectedCalendar.meetings.find((meet) => meet.id === id);
            if (foundMeeting) {
                setMeeting(foundMeeting);
                setCurrentParticipants(foundMeeting.participants || []);
            }
        }
    }, [id, selectedCalendar]);

    const handleAssignParticipant = () => {
        if (selectedParticipant) {
            assignParticipantToMeeting(selectedCalendar.id, id, selectedParticipant);
            const participant = participants.find(p => p.id === selectedParticipant);
            if (participant && !currentParticipants.some(p => p.id === participant.id)) {
                setCurrentParticipants([...currentParticipants, participant]);
            }
        }
    };

    const handleRemoveParticipant = (participantId) => {
        removeParticipantFromMeeting(selectedCalendar.id, meeting.id, participantId);
        setCurrentParticipants(currentParticipants.filter(p => p.id !== participantId));
    };

    if (!meeting) {
        return <p>Loading meeting details...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{meeting.title}</h2>
            <p className="mb-4">{meeting.details}</p>
            <p><strong>Day:</strong> {meeting.day}</p>
            <p><strong>Hour:</strong> {meeting.hour}:00</p>

            {/* Participant Assignment */}
            <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">Assign Participant:</h3>
                <select
                    className="border p-2 w-full mb-4"
                    value={selectedParticipant}
                    onChange={(e) => setSelectedParticipant(e.target.value)}
                >
                    <option value="">Select Participant</option>
                    {participants.map((participant) => (
                        <option key={participant.id} value={participant.id}>
                            {`${participant.name} (${participant.id.slice(0, 4)})`}
                        </option>
                    ))}
                </select>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={handleAssignParticipant}
                >
                    Add Participant to Meeting
                </button>

                {/* Display the list of participants */}
                {currentParticipants.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-bold mb-2">Participants:</h3>
                        <ul>
                            {currentParticipants.map((participant) => (
                                <li key={participant.id} className="flex items-center mb-2">
                                    {`${participant.name} (${participant.id.slice(0, 4)})`}
                                    <button
                                        className="ml-4 text-red-500 hover:text-red-700"
                                        onClick={() => handleRemoveParticipant(participant.id)}
                                    >
                                        ✖
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Meeting;
