import React, { useState, useContext } from 'react';
import { CalendarContext } from '../../context/CalendarContext';
import AddParticipantModal from './AddParticipantModal';

const Participants = () => {
    const { participants } = useContext(CalendarContext);
    const [participantModalVisible, setParticipantModalVisible] = useState(false);

    const openParticipantModal = () => {
        setParticipantModalVisible(true);
    };

    const closeParticipantModal = () => {
        setParticipantModalVisible(false);
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
                            <li key={participant.id} className="mb-2 text-lg">
                                {participant.name} ({participant.id.slice(0, 4)})
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
            />
        </div>
    );
};

export default Participants;
