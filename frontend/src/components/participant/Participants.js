import React, { useState, useContext } from 'react';
import { CalendarContext } from '../../context/CalendarContext';
import AddParticipantModal from './AddParticipantModal';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import the trash and edit icons

const Participants = () => {
    const { participants, removeParticipant, updateParticipant } = useContext(CalendarContext); // Include updateParticipant from context
    const [participantModalVisible, setParticipantModalVisible] = useState(false);
    const [editParticipant, setEditParticipant] = useState(null); // Track participant to be edited

    const openParticipantModal = () => {
        setParticipantModalVisible(true);
        setEditParticipant(null); // Set to null for adding a new participant
    };

    const closeParticipantModal = () => {
        setParticipantModalVisible(false);
    };

    const handleDeleteParticipant = (participantId) => {
        removeParticipant(participantId); // Delete participant using the context function
    };

    const handleEditParticipant = (participant) => {
        setEditParticipant(participant); // Set the participant to be edited
        setParticipantModalVisible(true); // Open the modal in edit mode
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4">Participants</h2>
                <button
                    className="bg-green-500 text-white p-2 rounded-lg"
                    onClick={openParticipantModal}
                >
                    Add Participant
                </button>
            </div>

            {/* List of Participants */}
            {participants.length > 0 ? (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <ul>
                        {participants.map((participant) => (
                            <li key={participant.id} className="mb-2 text-lg flex justify-between items-center">
                                <span>{participant.name} ({participant.id.slice(0, 4)})</span>
                                <div className="flex space-x-4">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => handleEditParticipant(participant)} // Edit participant
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteParticipant(participant.id)} // Delete participant
                                    >
                                        <FaTrashAlt size={18} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <p>No participants available. Add participants to get started.</p>
                </div>
            )}

            {/* Participant Modal */}
            <AddParticipantModal
                show={participantModalVisible}
                onClose={closeParticipantModal}
                participant={editParticipant} // Pass the participant to be edited
            />
        </div>
    );
};

export default Participants;
