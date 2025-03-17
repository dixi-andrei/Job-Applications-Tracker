import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInterview, updateInterview } from '../../api/interviewApi';
import { getJobApplicationById } from '../../api/jobApplicationApi';
import Button from '../ui/Button';

const InterviewForm = ({ interview = null, jobApplicationId, onSuccess }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        interviewerName: '',
        interviewerEmail: '',
        notes: '',
        jobApplicationId: jobApplicationId || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jobApplication, setJobApplication] = useState(null);

    useEffect(() => {
        if (interview) {
            const dateTime = new Date(interview.dateTime);
            setFormData({
                title: interview.title || '',
                date: dateTime.toISOString().split('T')[0],
                time: dateTime.toTimeString().split(' ')[0].substring(0, 5),
                location: interview.location || '',
                interviewerName: interview.interviewerName || '',
                interviewerEmail: interview.interviewerEmail || '',
                notes: interview.notes || '',
                jobApplicationId: interview.jobApplicationId,
            });
        }

        if (jobApplicationId) {
            const fetchJobApplication = async () => {
                try {
                    const data = await getJobApplicationById(jobApplicationId);
                    setJobApplication(data);
                } catch (err) {
                    setError('Failed to load job application details');
                }
            };
            fetchJobApplication();
        }
    }, [interview, jobApplicationId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Combine date and time into dateTime
            const dateTime = new Date(`${formData.date}T${formData.time}`);

            const submitData = {
                title: formData.title,
                dateTime: dateTime.toISOString(),
                location: formData.location,
                interviewerName: formData.interviewerName,
                interviewerEmail: formData.interviewerEmail,
                notes: formData.notes,
                jobApplicationId: parseInt(formData.jobApplicationId),
                completed: interview ? interview.completed : false
            };

            if (interview) {
                await updateInterview(interview.id, submitData);
            } else {
                await createInterview(submitData);
            }

            setLoading(false);
            if (onSuccess) {
                onSuccess();
            } else {
                navigate(`/job-applications/${formData.jobApplicationId}`);
            }
        } catch (err) {
            setLoading(false);
            setError('Failed to save the interview. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="interview-form">
            <h2>{interview ? 'Edit Interview' : 'Schedule New Interview'}</h2>
            {jobApplication && (
                <div className="job-info">
                    <p>For: {jobApplication.positionTitle} at {jobApplication.companyName}</p>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Interview Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Technical Interview, HR Screening"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Time</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Office address or Zoom link"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="interviewerName">Interviewer Name</label>
                        <input
                            type="text"
                            id="interviewerName"
                            name="interviewerName"
                            value={formData.interviewerName}
                            onChange={handleChange}
                            placeholder="Interviewer's name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="interviewerEmail">Interviewer Email</label>
                        <input
                            type="email"
                            id="interviewerEmail"
                            name="interviewerEmail"
                            value={formData.interviewerEmail}
                            onChange={handleChange}
                            placeholder="Interviewer's email"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Preparation notes, questions to ask, etc."
                        rows="4"
                    />
                </div>

                {!jobApplicationId && (
                    <div className="form-group">
                        <label htmlFor="jobApplicationId">Job Application</label>
                        <select
                            id="jobApplicationId"
                            name="jobApplicationId"
                            value={formData.jobApplicationId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a job application</option>
                            {/* This would typically be populated from an API call */}
                        </select>
                    </div>
                )}

                <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : (interview ? 'Update Interview' : 'Schedule Interview')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default InterviewForm;