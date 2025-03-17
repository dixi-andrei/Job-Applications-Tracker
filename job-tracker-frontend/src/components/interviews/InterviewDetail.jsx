import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInterviewById, updateInterview, markInterviewCompleted, deleteInterview } from '../../api/interviewApi';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Loader from '../ui/Loader';

const InterviewDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        scheduledDateTime: '',
        interviewType: '',
        interviewers: '',
        location: '',
        notes: '',
        completed: false
    });

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                setLoading(true);
                const data = await getInterviewById(id);
                setInterview(data);
                setFormData({
                    scheduledDateTime: new Date(data.scheduledDateTime).toISOString().slice(0, 16),
                    interviewType: data.interviewType,
                    interviewers: data.interviewers || '',
                    location: data.location || '',
                    notes: data.notes || '',
                    completed: data.completed
                });
            } catch (err) {
                setError('Failed to load interview details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInterview();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedInterview = await updateInterview(id, {
                ...formData,
                jobApplicationId: interview.jobApplication.id
            });
            setInterview(updatedInterview);
            setEditMode(false);
        } catch (err) {
            setError('Failed to update interview');
            console.error(err);
        }
    };

    const handleMarkCompleted = async () => {
        try {
            const updatedInterview = await markInterviewCompleted(id);
            setInterview(updatedInterview);
            setFormData(prev => ({
                ...prev,
                completed: true
            }));
        } catch (err) {
            setError('Failed to mark interview as completed');
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteInterview(id);
            navigate('/interviews');
        } catch (err) {
            setError('Failed to delete interview');
            console.error(err);
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;
    if (!interview) return <div className="not-found">Interview not found</div>;

    const interviewDate = new Date(interview.scheduledDateTime);
    const isPastInterview = interviewDate < new Date();

    return (
        <div className="interview-detail-container">
            {editMode ? (
                <form onSubmit={handleSubmit} className="interview-edit-form">
                    <h2>Edit Interview</h2>

                    <div className="form-group">
                        <label htmlFor="scheduledDateTime">Date & Time</label>
                        <input
                            type="datetime-local"
                            id="scheduledDateTime"
                            name="scheduledDateTime"
                            value={formData.scheduledDateTime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="interviewType">Interview Type</label>
                        <select
                            id="interviewType"
                            name="interviewType"
                            value={formData.interviewType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="PHONE_SCREEN">Phone Screen</option>
                            <option value="TECHNICAL">Technical</option>
                            <option value="BEHAVIORAL">Behavioral</option>
                            <option value="ONSITE">Onsite</option>
                            <option value="PANEL">Panel</option>
                            <option value="FINAL">Final</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="interviewers">Interviewers</label>
                        <input
                            type="text"
                            id="interviewers"
                            name="interviewers"
                            value={formData.interviewers}
                            onChange={handleInputChange}
                            placeholder="Names of interviewers (optional)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Interview location or video link (optional)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Interview details, questions to ask, etc."
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label htmlFor="completed">
                            <input
                                type="checkbox"
                                id="completed"
                                name="completed"
                                checked={formData.completed}
                                onChange={handleInputChange}
                            />
                            Mark as Completed
                        </label>
                    </div>

                    <div className="form-actions">
                        <Button type="submit">Save Changes</Button>
                        <Button type="button" onClick={() => setEditMode(false)} variant="secondary">
                            Cancel
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="interview-info">
                    <div className="interview-header">
                        <h2>
                            Interview with {interview.jobApplication.company.name}
                            <span className={`interview-status ${interview.completed ? 'completed' : isPastInterview ? 'past' : 'upcoming'}`}>
                {interview.completed ? 'Completed' : isPastInterview ? 'Past' : 'Upcoming'}
              </span>
                        </h2>
                        <div className="job-position">
                            for {interview.jobApplication.positionTitle} position
                        </div>
                    </div>

                    <div className="interview-details">
                        <div className="interview-detail">
                            <span className="detail-label">Date:</span>
                            <span className="detail-value">{interviewDate.toLocaleDateString()}</span>
                        </div>
                        <div className="interview-detail">
                            <span className="detail-label">Time:</span>
                            <span className="detail-value">
                {interviewDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
                        </div>
                        <div className="interview-detail">
                            <span className="detail-label">Type:</span>
                            <span className="detail-value">
                {interview.interviewType.replace('_', ' ')}
              </span>
                        </div>
                        {interview.interviewers && (
                            <div className="interview-detail">
                                <span className="detail-label">Interviewers:</span>
                                <span className="detail-value">{interview.interviewers}</span>
                            </div>
                        )}
                        {interview.location && (
                            <div className="interview-detail">
                                <span className="detail-label">Location:</span>
                                <span className="detail-value">{interview.location}</span>
                            </div>
                        )}
                    </div>

                    {interview.notes && (
                        <div className="interview-notes">
                            <h3>Notes</h3>
                            <p>{interview.notes}</p>
                        </div>
                    )}

                    <div className="interview-actions">
                        <Button onClick={() => setEditMode(true)}>Edit</Button>
                        {!interview.completed && (
                            <Button onClick={handleMarkCompleted} variant="primary">Mark as Completed</Button>
                        )}
                        <Button onClick={() => setShowDeleteModal(true)} variant="danger">Delete</Button>
                    </div>

                    <div className="related-job">
                        <h3>Related Job Application</h3>
                        <Button onClick={() => navigate(`/job-applications/${interview.jobApplication.id}`)}>
                            View Job Application
                        </Button>
                    </div>
                </div>
            )}

            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Confirm Delete"
            >
                <p>Are you sure you want to delete this interview? This action cannot be undone.</p>
                <div className="modal-actions">
                    <Button onClick={handleDelete} variant="danger">Delete</Button>
                    <Button onClick={() => setShowDeleteModal(false)} variant="secondary">Cancel</Button>
                </div>
            </Modal>
        </div>
    );
};

export default InterviewDetail;