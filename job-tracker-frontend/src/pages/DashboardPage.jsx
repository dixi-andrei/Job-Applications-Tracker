import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobApplicationApi from '../api/jobApplicationApi';
import interviewApi from '../api/interviewApi';

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [recentApplications, setRecentApplications] = useState([]);
    const [upcomingInterviews, setUpcomingInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statusCounts, applications, interviews] = await Promise.all([
                    jobApplicationApi.getApplicationStatusCounts(),
                    jobApplicationApi.getRecentJobApplications(5),
                    interviewApi.getUpcomingInterviews()
                ]);

                setStats(statusCounts);
                setRecentApplications(applications);
                setUpcomingInterviews(interviews);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>

            <section className="stats-section">
                <h2>Application Overview</h2>
                <div className="stats-cards">
                    {stats && Object.entries(stats).map(([status, count]) => (
                        <div className="stat-card" key={status}>
                            <h3>{status}</h3>
                            <p className="stat-number">{count}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="recent-applications">
                <div className="section-header">
                    <h2>Recent Applications</h2>
                    <Link to="/applications" className="view-all">View All</Link>
                </div>
                {recentApplications.length > 0 ? (
                    <div className="application-list">
                        {recentApplications.map(app => (
                            <div className="application-card" key={app.id}>
                                <h3>{app.positionTitle}</h3>
                                <p className="company-name">{app.companyName}</p>
                                <div className="status-badge">{app.status}</div>
                                <Link to={`/applications/${app.id}`} className="view-details">View Details</Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No recent applications found.</p>
                )}
            </section>

            <section className="upcoming-interviews">
                <div className="section-header">
                    <h2>Upcoming Interviews</h2>
                    <Link to="/interviews" className="view-all">View All</Link>
                </div>
                {upcomingInterviews.length > 0 ? (
                    <div className="interview-list">
                        {upcomingInterviews.map(interview => (
                            <div className="interview-card" key={interview.id}>
                                <div className="interview-date">
                                    {new Date(interview.dateTime).toLocaleDateString()}
                                </div>
                                <div className="interview-time">
                                    {new Date(interview.dateTime).toLocaleTimeString()}
                                </div>
                                <h3>{interview.jobApplication.positionTitle}</h3>
                                <p>{interview.jobApplication.companyName}</p>
                                <p>{interview.interviewType}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No upcoming interviews.</p>
                )}
            </section>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <Link to="/applications/new" className="btn-primary">Add New Application</Link>
                    <Link to="/interviews/new" className="btn-secondary">Schedule Interview</Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;