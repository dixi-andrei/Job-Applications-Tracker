import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingInterviews, getInterviewsInDateRange } from '../api/interviewApi';
import InterviewList from '../components/interviews/InterviewList';
import InterviewCalendar from '../components/interviews/InterviewCalendar';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import Tab from '../components/ui/Tab';

const InterviewsPage = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('list');
    const [dateRange, setDateRange] = useState({
        start: new Date(),
        end: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    });

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                setLoading(true);
                let data;

                if (viewMode === 'list') {
                    data = await getUpcomingInterviews();
                } else {
                    data = await getInterviewsInDateRange(
                        dateRange.start.toISOString(),
                        dateRange.end.toISOString()
                    );
                }

                setInterviews(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load interviews');
                setLoading(false);
                console.error(err);
            }
        };

        fetchInterviews();
    }, [viewMode, dateRange]);

    const handleDateRangeChange = (newRange) => {
        setDateRange(newRange);
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="interviews-page">
            <div className="page-header">
                <h1>Interviews</h1>
                <Link to="/interviews/new">
                    <Button variant="primary">Schedule Interview</Button>
                </Link>
            </div>

            <div className="view-toggle">
                <Tab
                    tabs={[
                        { id: 'list', label: 'List View' },
                        { id: 'calendar', label: 'Calendar View' },
                    ]}
                    activeTab={viewMode}
                    onTabChange={setViewMode}
                />
            </div>

            {interviews.length === 0 ? (
                <div className="empty-state">
                    <p>No upcoming interviews. Schedule interviews for your job applications.</p>
                    <Link to="/interviews/new">
                        <Button variant="primary">Schedule Your First Interview</Button>
                    </Link>
                </div>
            ) : (
                <div className="interviews-container">
                    {viewMode === 'list' ? (
                        <InterviewList interviews={interviews} />
                    ) : (
                        <InterviewCalendar
                            interviews={interviews}
                            dateRange={dateRange}
                            onDateRangeChange={handleDateRangeChange}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default InterviewsPage;