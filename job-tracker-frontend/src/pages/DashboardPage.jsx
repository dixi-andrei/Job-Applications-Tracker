import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecentJobApplications } from '../api/jobApplicationApi';
import { getUpcomingInterviews } from '../api/interviewApi';
import { getApplicationsStatusCounts } from '../api/jobApplicationApi';
import Dashboard from '../components/common/DashBoard';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';

const DashboardPage = () => {
    const [recentApplications, setRecentApplications] = useState([]);
    const [upcomingInterviews, setUpcomingInterviews] = useState([]);
    const [statusCounts, setStatusCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [applicationsRes, interviewsRes, statusCountsRes] = await Promise.all([
                    getRecentJobApplications(5),
                    getUpcomingInterviews(),
                    getApplicationsStatusCounts(),
                ]);

                setRecentApplications(applicationsRes);
                setUpcomingInterviews(interviewsRes);
                setStatusCounts(statusCountsRes);
                setLoading(false);
            } catch (err) {
                setError('Failed to load dashboard data');
                setLoading(false);
                console.error(err);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>

            <Dashboard
                recentApplications={recentApplications}
                upcomingInterviews={upcomingInterviews}
                statusCounts={statusCounts}
            />

            <div className="dashboard-actions">
                <Link to="/job-applications/new">
                    <Button variant="primary">Add New Application</Button>
                </Link>
                <Link to="/interviews/new">
                    <Button variant="secondary">Schedule Interview</Button>
                </Link>
            </div>
        </div>
    );
};

export default DashboardPage;