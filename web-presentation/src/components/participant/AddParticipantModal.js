import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../context/CalendarContext';

const AddParticipantModal = ({ show, onClose, participant, meetingId }) => {
    const { addParticipant, updateParticipant, calendars } = useStateContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '' });

    useEffect(() => {
        if (participant) {
            // Pre-fill the modal with the participant's current data when editing
            setName(participant.name);
            setEmail(participant.email);
        } else {
            setName('');
            setEmail('');
        }
    }, [calendars, participant]);

    if (!show) return null;

    const handleSubmit = async() => {
        let valid = true;
        const newErrors = { name: '', email: '' };

        if (name.trim() === '') {
            newErrors.name = 'Name is required.';
            valid = false;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Invalid email format.';
            valid = false;
        }

        if (valid) {
            if (participant) {
                // Update existing participant
               await  updateParticipant(participant.id, name, email);
            } else {
                // Add new participant
                await addParticipant(name, email, meetingId);
            }
            setName('');
            setEmail('');
            onClose(); // Close modal after saving
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">{participant ? 'Edit Participant' : 'Add Participant'}</h2>

                <div className="mb-4">
                    <label className="block font-bold">Name:</label>
                    <input
                        className="border p-2 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-bold">Email:</label>
                    <input
                        className="border p-2 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="flex justify-end space-x-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                        {participant ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddParticipantModal;
