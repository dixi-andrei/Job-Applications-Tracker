import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingInterviews, getInterviewsInDateRange } from '../../api/interviewApi';
import Button from '../ui/Button';
import Loader from '../ui/Loader';
import Dropdown from '../ui/Dropdown';

const InterviewList = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('upcoming');
    const [dateRange, setDateRange] = useState({
        start: new Date(),
        end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Default to next 30 days
    });

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                setLoading(true);
                let data;

                if (filterType === 'upcoming') {
                    data = await getUpcomingInterviews();
                } else {
                    // Format dates for API
                    const startDate = dateRange.start.toISOString();
                    const endDate = dateRange.end.toISOString();
                    data = await getInterviewsInDateRange(startDate, endDate);
                }

                setInterviews(data);
            } catch (err) {
                setError('Failed to load interviews');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInterviews();
    }, [filterType, dateRange]);

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDateRange(prev => ({
            ...prev,
            [name]: new Date(value)
        }));
    };

    const filterOptions = [
        { value: 'upcoming', label: 'Upcoming Interviews' },
        { value: 'date-range', label: 'Custom Date Range' }
    ];

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="interview-list-container">
            <div className="interview-list-header">
                <h2>Interviews</h2>
                <Link to="/interviews/new">
                    <Button>Add New Interview</Button>
                </Link>
            </div>

            <div className="filter-section">
                <Dropdown
                    options={filterOptions}
                    value={filterType}
                    onChange={(value) => setFilterType(value)}
                    label="Filter"
                />

                {filterType === 'date-range' && (
                    <div className="date-range-picker">
                        <div className="date-input">
                            <label htmlFor="start">Start Date</label>
                            <input
                                type="date"
                                id="start"
                                name="start"
                                value={dateRange.start.toISOString().substring(0, 10)}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="date-input">
                            <label htmlFor="end">End Date</label>
                            <input
                                type="date"
                                id="end"
                                name="end"
                                value={dateRange.end.toISOString().substring(0, 10)}
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>
                )}
            </div>

            {interviews.length === 0 ? (
                <div className="no-interviews">
                    <p>No interviews found. Add an interview to get started.</p>
                </div>
            ) : (
                <div className="interviews-list">
                    {interviews.map((interview) => (
                        <Link to={`/interviews/${interview.id}`} key={interview.id} className="interview-card-link">
                            <div className="interview-card">
                                <div className="interview-header">
                                    <h3>{interview.jobApplication.company.name}</h3>
                                    <span className={`interview-status ${interview.completed ? 'completed' : 'upcoming'}`}>
                    {interview.completed ? 'Completed' : 'Upcoming'}
                  </span>
                                </div>

                                <div className="interview-position">
                                    {interview.jobApplication.positionTitle}
                                </div>

                                <div className="interview-details">
                                    <div className="interview-detail">
                                        <span className="detail-label">Date:</span>
                                        <span className="detail-value">
                      {new Date(interview.scheduledDateTime).toLocaleDateString()}
                    </span>
                                    </div>
                                    <div className="interview-detail">
                                        <span className="detail-label">Time:</span>
                                        <span className="detail-value">
                      {new Date(interview.scheduledDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                                    </div>
                                    <div className="interview-detail">
                                        <span className="detail-label">Type:</span>
                                        <span className="detail-value">{interview.interviewType}</span>
                                    </div>
                                </div>

                                {interview.location && (
                                    <div className="interview-location">{interview.location}</div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InterviewList;