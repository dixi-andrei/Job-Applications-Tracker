import React from 'react';
import JobApplicationList from '../components/jobApplications/JobApplicationList';

const JobApplicationsPage = () => {
    return (
        <div className="job-applications-page">
            <h1>Job Applications</h1>
            <JobApplicationList />
        </div>
    );
};

export default JobApplicationsPage;