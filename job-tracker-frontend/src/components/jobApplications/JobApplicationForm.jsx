import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJobApplication, updateJobApplication } from '../../api/jobApplicationApi';
import { searchCompaniesByName } from '../../api/companyApi';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import { APPLICATION_STATUSES } from '../../utils/constants';

const JobApplicationForm = ({ jobApplication = null, onSuccess }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        positionTitle: '',
        companyName: '',
        companyId: '',
        jobDescription: '',
        applicationDate: new Date().toISOString().split('T')[0],
        applicationLink: '',
        salary: '',
        location: '',
        status: 'APPLIED',
        notes: ''
    });

    const [companySearchResults, setCompanySearchResults] = useState([]);
    const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (jobApplication) {
            setFormData({
                positionTitle: jobApplication.positionTitle || '',
                companyName: jobApplication.companyName || '',
                companyId: jobApplication.companyId || '',
                jobDescription: jobApplication.jobDescription || '',
                applicationDate: jobApplication.applicationDate ? new Date(jobApplication.applicationDate).toISOString().split('T')[0] : '',
                applicationLink: jobApplication.applicationLink || '',
                salary: jobApplication.salary || '',
                location: jobApplication.location || '',
                status: jobApplication.status || 'APPLIED',
                notes: jobApplication.notes || ''
            });
        }
    }, [jobApplication]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'companyName') {
            handleCompanySearch(value);
        }
    };

    const handleCompanySearch = async (query) => {
        if (query.length < 2) {
            setCompanySearchResults([]);
            setShowCompanyDropdown(false);
            return;
        }

        try {
            const results = await searchCompaniesByName(query);
            setCompanySearchResults(results);
            setShowCompanyDropdown(results.length > 0);
        } catch (err) {
            console.error('Failed to search companies:', err);
        }
    };

    const handleCompanySelect = (company) => {
        setFormData(prev => ({
            ...prev,
            companyName: company.name,
            companyId: company.id
        }));
        setShowCompanyDropdown(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const submitData = {
                ...formData,
                applicationDate: formData.applicationDate ? new Date(formData.applicationDate).toISOString() : null,
            };

            if (jobApplication) {
                await updateJobApplication(jobApplication.id, submitData);
            } else {
                await createJobApplication(submitData);
            }

            setLoading(false);
            if (onSuccess) {
                onSuccess();
            } else {
                navigate('/job-applications');
            }
        } catch (err) {
            setLoading(false);
            setError('Failed to save the job application. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="job-application-form">
            <h2>{jobApplication ? 'Edit Job Application' : 'Add New Job Application'}</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="positionTitle">Position Title</label>
                    <input
                        type="text"
                        id="positionTitle"
                        name="positionTitle"
                        value={formData.positionTitle}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Software Engineer, Product Manager"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="companyName">Company</label>
                    <div className="dropdown-container">
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                            placeholder="Start typing company name..."
                            autoComplete="off"
                        />
                        {showCompanyDropdown && (
                            <Dropdown
                                items={companySearchResults.map(company => ({
                                    id: company.id,
                                    label: company.name,
                                    onClick: () => handleCompanySelect(company)
                                }))}
                                onClose={() => setShowCompanyDropdown(false)}
                            />
                        )}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="applicationDate">Application Date</label>
                        <input
                            type="date"
                            id="applicationDate"
                            name="applicationDate"
                            value={formData.applicationDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            {APPLICATION_STATUSES.map(status => (
                                <option key={status} value={status}>
                                    {status.replace('_', ' ')}
                                </option>
                            ))}
                        </select>
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
                        placeholder="e.g., Remote, New York, NY"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="e.g., $80,000 - $100,000"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="applicationLink">Application Link</label>
                    <input
                        type="url"
                        id="applicationLink"
                        name="applicationLink"
                        value={formData.applicationLink}
                        onChange={handleChange}
                        placeholder="https://..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="jobDescription">Job Description</label>
                    <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleChange}
                        placeholder="Copy and paste the job description here"
                        rows="6"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Additional notes about the application"
                        rows="3"
                    />
                </div>

                <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : (jobApplication ? 'Update Application' : 'Add Application')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default JobApplicationForm;