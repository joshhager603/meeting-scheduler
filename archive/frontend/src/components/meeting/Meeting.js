import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../context/CalendarContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AddParticipantModal from '../participant/AddParticipantModal'; // Import the AddParticipantModal component
import AttachmentModal from '../attachment/AttachmentModal';
import {format} from "date-fns";

const Meeting = () => {
    const { id } = useParams(); // Get the meeting ID from the URL
    const {removeParticipant, fetchMeeting, updateMeeting, calendars , removeAttachment} = useStateContext();
    const [meeting, setMeeting] = useState(null);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [currentParticipants, setCurrentParticipants] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [isParticipantModalVisible, setParticipantModalVisible] = useState(false);
    const [isAttachmentModalVisible, setAttachmentModalVisible] = useState(false);
    const navigate = useNavigate();

 // Load the meeting details when the component is mounted
    useEffect(() => {
        const loadMeeting = async () => {
            const foundMeeting = await fetchMeeting(id);
            if (foundMeeting) {
                setMeeting(foundMeeting);
                setTitle(foundMeeting.title);
                setLocation(foundMeeting.location);
                setDetails(foundMeeting.details);
                // Adjust for timezone by setting the date based on local timezone
                const localDate = new Date(foundMeeting.date + 'T00:00:00');  // Force local time zone interpretation
                setDate(localDate);
                setTime(foundMeeting.time);
                setCurrentParticipants(foundMeeting.participants || []);
                setAttachments(foundMeeting.attachments || [])
            }
        };

        loadMeeting();  // Call the async function

    }, [id, calendars]);



    const handleRemoveParticipant = async (participantId) => {
        await removeParticipant(participantId)
    };

    const handleRemoveAttachment = async (attachmentId) => {
        await removeAttachment(attachmentId)
    };

    const handleUpdateMeeting = () => {
        const updatedMeeting = {
            ...meeting,
            title,
            location,
            details,
            date: format(date, 'yyyy-MM-dd'),  // Format date to 'YYYY-MM-DD'
            time,
            participants: currentParticipants,
        };

        updateMeeting(updatedMeeting);
        navigate(`/dailyCalendar/${meeting.calendar_id}`);
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


            <div className="mb-4">
                <label className="block font-bold">Attachments:</label>
                {attachments.map((attachment)=>(
                    <li key={attachment.id} className="flex items-center mb-2">
                    {`${attachment.url}`}
                    <button
                        className="ml-4 text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveAttachment(attachment.id)}
                    >
                        ✖
                    </button>
                </li>
                ))}

            <div className="flex items-center">

            {/* Button to open modal to add a new participant */}
            <button
                className=" bg-blue-500 text-white py-2 rounded"
                onClick={() => setAttachmentModalVisible(true)} // Open modal for adding a new participant
            >
            create new Attachment
            </button>
            </div>
            </div>

            {/* Participant Assignment */}
            <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">Assign Participant:</h3>
                <div className="flex items-center">

                    {/* Button to open modal to add a new participant */}
                    <button
                        className=" bg-blue-500 text-white py-2 rounded"
                        onClick={() => setParticipantModalVisible(true)} // Open modal for adding a new participant
                    >
                       create new participant
                    </button>
                </div>

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
                meetingId={meeting?.id}
            />

            <AttachmentModal
            show={isAttachmentModalVisible}
            onClose={()=> setAttachmentModalVisible(false)}
            meetingId = {meeting?.id}
            />

        </div>
    );
};

export default Meeting;
