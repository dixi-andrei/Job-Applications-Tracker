import React, { useState } from 'react';
import { updateJobApplicationStatus } from '../../../api/jobApplicationApi';
import Dropdown from '../../ui/Dropdown';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';

const JobApplicationStatusUpdate = ({ applicationId, currentStatus, onStatusUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    const statusOptions = [
        { value: 'APPLIED', label: 'Applied' },
        { value: 'PHONE_SCREEN', label: 'Phone Screen' },
        { value: 'INTERVIEW', label: 'Interview' },
        { value: 'OFFER', label: 'Offer' },
        { value: 'REJECTED', label: 'Rejected' },
        { value: 'ACCEPTED', label: 'Accepted' },
    ];

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
    };

    const openModal = () => {
        setIsModalOpen(true);
        setSelectedStatus(currentStatus);
        setError(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedStatus === currentStatus) {
            closeModal();
            return;
        }

        try {
            setUpdating(true);
            setError(null);

            const updatedApplication = await updateJobApplicationStatus(applicationId, selectedStatus);

            setUpdating(false);
            onStatusUpdate(updatedApplication);
            closeModal();
        } catch (err) {
            setUpdating(false);
            setError('Failed to update application status');
            console.error(err);
        }
    };

    return (
        <>
            <Button variant="secondary" onClick={openModal}>
                Update Status
            </Button>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="Update Application Status">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="status">Select New Status</label>
                        <Dropdown
                            id="status"
                            options={statusOptions}
                            value={selectedStatus}
                            onChange={handleStatusChange}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="modal-actions">
                        <Button type="button" variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={updating || selectedStatus === currentStatus}>
                            {updating ? 'Updating...' : 'Update Status'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default JobApplicationStatusUpdate;