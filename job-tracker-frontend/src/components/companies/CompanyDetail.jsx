import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCompanyById, deleteCompany } from '../../api/companyApi';
import { searchJobApplicationsByCompany } from '../../api/jobApplicationApi';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Loader from '../ui/Loader';

const CompanyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                setIsLoading(true);

                // Fetch company details
                const companyData = await getCompanyById(id);
                setCompany(companyData);

                // Fetch job applications for this company
                const applicationsData = await searchJobApplicationsByCompany(companyData.name);
                setApplications(applicationsData);

                setError(null);
            } catch (err) {
                setError('Failed to load company details');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanyData();
    }, [id]);

    const handleEdit = () => {
        navigate(`/companies/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await deleteCompany(id);
            navigate('/companies');
        } catch (err) {
            setError('Failed to delete company');
            console.error(err);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error || !company) {
        return <div className="error-message">{error || 'Company not found'}</div>;
    }

    return (
        <div className="company-detail-container">
            <div className="page-header">
                <div className="breadcrumbs">
                    <Link to="/companies">Companies</Link> / {company.name}
                </div>
                <div className="action-buttons">
                    <Button variant="outline" onClick={handleEdit}>Edit</Button>
                    <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
                </div>
            </div>

            <Card className="company-detail-card">
                <div className="company-header">
                    <div className="company-logo-placeholder">
                        {company.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="company-title">
                        <h1>{company.name}</h1>
                        {company.industry && <span className="company-industry">{company.industry}</span>}
                    </div>
                </div>

                <div className="company-info-grid">
                    {company.website && (
                        <div className="info-item">
                            <span className="info-label">Website</span>
                            <a href={company.website} target="_blank" rel="noopener noreferrer">
                                {company.website}
                            </a>
                        </div>
                    )}

                    {company.location && (
                        <div className="info-item">
                            <span className="info-label">Location</span>
                            <span>{company.location}</span>
                        </div>
                    )}

                    {company.contactEmail && (
                        <div className="info-item">
                            <span className="info-label">Contact Email</span>
                            <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>
                        </div>
                    )}

                    {company.contactPhone && (
                        <div className="info-item">
                            <span className="info-label">Contact Phone</span>
                            <a href={`tel:${company.contactPhone}`}>{company.contactPhone}</a>
                        </div>
                    )}
                </div>

                {company.notes && (
                    <div className="company-notes">
                        <h3>Notes</h3>
                        <p>{company.notes}</p>
                    </div>
                )}
            </Card>

            <div className="company-applications">
                <h2>Job Applications</h2>
                {applications.length === 0 ? (
                    <p className="no-applications">No job applications with this company yet.</p>
                ) : (
                    <div className="applications-list">
                        {applications.map(app => (
                            <Card key={app.id} className="application-card">
                                <div className="application-header">
                                    <h3>{app.positionTitle}</h3>
                                    <span className={`application-status status-${app.status.toLowerCase()}`}>
                    {app.status.replace('_', ' ')}
                  </span>
                                </div>
                                <div className="application-date">
                                    Applied: {new Date(app.applicationDate).toLocaleDateString()}
                                </div>
                                <Link to={`/job-applications/${app.id}`} className="view-application">
                                    View Application
                                </Link>
                            </Card>
                        ))}
                    </div>
                )}

                <div className="add-application-button">
                    <Link to={`/job-applications/new?companyId=${company.id}`}>
                        <Button>Add New Application</Button>
                    </Link>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Company"
            >
                <p>Are you sure you want to delete {company.name}?</p>
                <p>This will permanently remove the company and cannot be undone.</p>
                <div className="modal-actions">
                    <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </div>
            </Modal>
        </div>
    );
};

export default CompanyDetail;