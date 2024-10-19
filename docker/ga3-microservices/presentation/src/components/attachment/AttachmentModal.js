import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../context/CalendarContext';

const AttachmentModal = ({ show, onClose, attachment, meetingId }) => {
    const { addAttachment, updateAttachment, calendars } = useStateContext();
    const [url, setUrl] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ name: '' });

    useEffect(() => {
        if (attachment) {
            // Pre-fill the modal with the Attachment's current data when editing
            setUrl(attachment.url);
        } else {
            setUrl('');
        }
    }, [calendars, attachment]);

    if (!show) return null;

    const handleSubmit = async() => {
        let valid = true;
        const newErrors = { url: '' };

        if (url.trim() === '') {
            newErrors.name = 'Url is required.';
            valid = false;
        }

        if (valid) {
            if (attachment) {
                // Update existing participant
               await  updateAttachment(attachment.id, url);
            } else {
                // Add new AttupdateAttachment
                await addAttachment(url, meetingId);
            }
            setUrl('');
            onClose(); // Close modal after saving
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">{attachment ? 'Edit Attachment' : 'Add Attachment'}</h2>

                <div className="mb-4">
                    <label className="block font-bold">Url:</label>
                    <input
                        className="border p-2 w-full"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
                </div>


                <div className="flex justify-end space-x-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                        {attachment ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AttachmentModal;
