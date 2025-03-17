import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllJobApplications, getJobApplicationsByStatus } from '../../api/jobApplicationApi';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Loader from '../ui/Loader';
import Dropdown from '../ui/Dropdown';

const JobApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('ALL');

    const statusOptions = [
        { value: 'ALL', label: 'All Applications' },
        { value: 'APPLIED', label: 'Applied' },
        { value: 'PHONE_SCREEN', label: 'Phone Screen' },
        { value: 'INTERVIEW', label: 'Interview' },
        { value: 'OFFER', label: 'Offer' },
        { value: 'REJECTED', label: 'Rejected' },
        { value: 'ACCEPTED', label: 'Accepted' },
    ];

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                let data;

                if (statusFilter === 'ALL') {
                    data = await getAllJobApplications();
                } else {
                    data = await getJobApplicationsByStatus(statusFilter);
                }

                setApplications(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load job applications');
                setLoading(false);
                console.error(err);
            }
        };

        fetchApplications();
    }, [statusFilter]);

    const handleStatusChange = (value) => {
        setStatusFilter(value);
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="job-application-list">
            <div className="list-header">
                <h2>My Job Applications</h2>
                <div className="list-actions">
                    <Dropdown
                        options={statusOptions}
                        value={statusFilter}
                        onChange={handleStatusChange}
                        label="Filter by status"
                    />
                    <Link to="/job-applications/new">
                        <Button variant="primary">Add New Application</Button>
                    </Link>
                </div>
            </div>

            {applications.length === 0 ? (
                <div className="empty-state">
                    <p>No job applications found. Start tracking your job search by adding applications.</p>
                    <Link to="/job-applications/new">
                        <Button variant="primary">Add Your First Application</Button>
                    </Link>
                </div>
            ) : (
                <div className="application-grid">
                    {applications.map((application) => (
                        <Link to={`/job-applications/${application.id}`} key={application.id}>
                            <Card className="application-card">
                                <div className="card-header">
                                    <h3>{application.positionTitle}</h3>
                                    <span className={`status-badge ${application.status.toLowerCase()}`}>
                    {application.status.replace('_', ' ')}
                  </span>
                                </div>
                                <div className="card-body">
                                    <p className="company-name">{application.company.name}</p>
                                    <p className="application-date">Applied: {new Date(application.applicationDate).toLocaleDateString()}</p>
                                    {application.nextInterviewDate && (
                                        <p className="next-interview">
                                            Next Interview: {new Date(application.nextInterviewDate).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobApplicationList;