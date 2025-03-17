import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { AuthContext } from '../../context/AuthContext';
import { getRecentJobApplications } from '../../api/jobApplicationApi';
import { getUpcomingInterviews } from '../../api/interviewApi';
import { getJobApplicationsByStatus } from '../../api/jobApplicationApi';

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const [recentApplications, setRecentApplications] = useState([]);
    const [upcomingInterviews, setUpcomingInterviews] = useState([]);
    const [statusCounts, setStatusCounts] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);

                // Fetch data in parallel for better performance
                const [applicationsResponse, interviewsResponse, statusCountsResponse] = await Promise.all([
                    getRecentJobApplications(5),
                    getUpcomingInterviews(),
                    getJobApplicationsByStatus()
                ]);

                setRecentApplications(applicationsResponse);
                setUpcomingInterviews(interviewsResponse);
                setStatusCounts(statusCountsResponse);
            } catch (err) {
                setError('Failed to load dashboard data');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (currentUser) {
            fetchDashboardData();
        }
    }, [currentUser]);

    if (isLoading) {
        return <div className="loading">Loading dashboard data...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="dashboard">
            <h1>Welcome, {currentUser?.firstName || currentUser?.username}</h1>

            <div className="dashboard-stats">
                <Card className="stats-card">
                    <h3>Application Status</h3>
                    <div className="status-grid">
                        <div className="status-item">
                            <span className="status-count">{statusCounts.APPLIED || 0}</span>
                            <span className="status-label">Applied</span>
                        </div>
                        <div className="status-item">
                            <span className="status-count">{statusCounts.INTERVIEWING || 0}</span>
                            <span className="status-label">Interviewing</span>
                        </div>
                        <div className="status-item">
                            <span className="status-count">{statusCounts.OFFER_RECEIVED || 0}</span>
                            <span className="status-label">Offers</span>
                        </div>
                        <div className="status-item">
                            <span className="status-count">{statusCounts.REJECTED || 0}</span>
                            <span className="status-label">Rejected</span>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="dashboard-sections">
                <section className="recent-applications">
                    <div className="section-header">
                        <h2>Recent Applications</h2>
                        <Link to="/job-applications" className="view-all">View All</Link>
                    </div>

                    {recentApplications.length > 0 ? (
                        <div className="applications-list">
                            {recentApplications.map(app => (
                                <Card key={app.id} className="application-card">
                                    <h3>{app.positionTitle}</h3>
                                    <p className="company-name">{app.company?.name || 'Unknown Company'}</p>
                                    <div className="application-meta">
                    <span className={`status status-${app.status.toLowerCase()}`}>
                      {app.status.replace('_', ' ')}
                    </span>
                                        <span className="date">{new Date(app.applicationDate).toLocaleDateString()}</span>
                                    </div>
                                    <Link to={`/job-applications/${app.id}`} className="view-details">
                                        View Details
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="no-data">No applications yet. <Link to="/job-applications/new">Create your first application</Link></p>
                    )}
                </section>

                <section className="upcoming-interviews">
                    <div className="section-header">
                        <h2>Upcoming Interviews</h2>
                        <Link to="/interviews" className="view-all">View All</Link>
                    </div>

                    {upcomingInterviews.length > 0 ? (
                        <div className="interviews-list">
                            {upcomingInterviews.map(interview => (
                                <Card key={interview.id} className="interview-card">
                                    <div className="interview-header">
                                        <h3>{interview.jobApplication?.positionTitle}</h3>
                                        <span className="interview-type">{interview.interviewType}</span>
                                    </div>
                                    <p className="company-name">{interview.jobApplication?.company?.name || 'Unknown Company'}</p>
                                    <div className="interview-datetime">
                                        <div className="interview-date">
                                            <i className="icon-calendar"></i>
                                            {new Date(interview.scheduledTime).toLocaleDateString()}
                                        </div>
                                        <div className="interview-time">
                                            <i className="icon-clock"></i>
                                            {new Date(interview.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                    <Link to={`/interviews/${interview.id}`} className="view-details">
                                        View Details
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="no-data">No upcoming interviews scheduled.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Dashboard;