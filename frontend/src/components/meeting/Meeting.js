import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../context/CalendarContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AddParticipantModal from '../participant/AddParticipantModal'; // Import the AddParticipantModal component

const Meeting = () => {
    const { id } = useParams(); // Get the meeting ID from the URL
    const { selectedCalendar, assignParticipantToMeeting, removeParticipantFromMeeting, participants, updateMeeting } = useStateContext();
    const [meeting, setMeeting] = useState(null);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [selectedParticipant, setSelectedParticipant] = useState('');
    const [currentParticipants, setCurrentParticipants] = useState([]);
    const [isParticipantModalVisible, setParticipantModalVisible] = useState(false); // For showing/hiding the modal
    const navigate = useNavigate();

    // Load the meeting details when the component is mounted
    useEffect(() => {
        if (selectedCalendar && id) {
            const foundMeeting = selectedCalendar.meetings.find((meet) => meet.id === id);
            if (foundMeeting) {
                setMeeting(foundMeeting);
                setTitle(foundMeeting.title);
                setLocation(foundMeeting.location);
                setDetails(foundMeeting.details);
                setDate(new Date(foundMeeting.date));
                setTime(foundMeeting.time);
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

    const handleUpdateMeeting = () => {
        const updatedMeeting = {
            ...meeting,
            title,
            location,
            details,
            date: date.toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
            time,
            participants: currentParticipants,
        };

        updateMeeting(selectedCalendar.id, updatedMeeting);
        navigate(`/weeklyCalendar/${selectedCalendar?.id}`);
    };

    const handleAddNewParticipant = (newParticipant) => {
        setParticipantModalVisible(false); // Close the modal after adding the new participant
    };

    if (!meeting) {
        return <p>Loading meeting details...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Meeting</h2>

            <div className="mb-4">
                <label className="block font-bold">Title:</label>
                <input
                    className="border p-2 w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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

            {/* Date and Time Editing */}
            <div className="mb-4">
                <label className="block font-bold">Date:</label>
                <DatePicker
                    selected={date}
                    onChange={(newDate) => setDate(newDate)}
                    dateFormat="MMMM d, yyyy"
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block font-bold">Time:</label>
                <input
                    type="time"
                    className="border p-2 w-full"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>

            {/* Participant Assignment */}
            <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">Assign Participant:</h3>
                <div className="flex items-center">
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

                    {/* Button to open modal to add a new participant */}
                    <button
                        className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => setParticipantModalVisible(true)} // Open modal for adding a new participant
                    >
                        + Add Participant
                    </button>
                </div>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={handleAssignParticipant}
                >
                    Add Participant to Meeting
                </button>

                {/* Display the list of participants */}
                {currentParticipants?.length > 0 && (
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

            <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                onClick={handleUpdateMeeting}
            >
                Save Changes
            </button>

            {/* Participant Modal */}
            <AddParticipantModal
                show={isParticipantModalVisible}
                onClose={() => setParticipantModalVisible(false)}
                onAddParticipant={handleAddNewParticipant} // Handle adding the new participant
            />
        </div>
    );
};

export default Meeting;
