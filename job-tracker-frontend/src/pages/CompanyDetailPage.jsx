import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCompanyById, deleteCompany } from '../api/companyApi';
import { searchJobApplicationsByCompany } from '../api/jobApplicationApi';
import CompanyDetail from '../components/companies/CompanyDetail';
import JobApplicationList from '../components/jobApplications/JobApplicationList';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Loader from '../components/ui/Loader';

const CompanyDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                setLoading(true);
                const [companyData, applicationsData] = await Promise.all([
                    getCompanyById(id),
                    searchJobApplicationsByCompany(id),
                ]);

                setCompany(companyData);
                setApplications(applicationsData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load company details');
                setLoading(false);
                console.error(err);
            }
        };

        fetchCompanyData();
    }, [id]);

    const handleDeleteConfirm = async () => {
        try {
            await deleteCompany(id);
            navigate('/companies');
        } catch (err) {
            setError('Failed to delete company');
            console.error(err);
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;
    if (!company) return <div className="not-found">Company not found</div>;

    return (
        <div className="company-detail-page">
            <div className="page-header">
                <h1>{company.name}</h1>
                <div className="header-actions">
                    <Link to={`/companies/${id}/edit`}>
                        <Button variant="secondary">Edit</Button>
                    </Link>
                    <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
                        Delete
                    </Button>
                </div>
            </div>

            <CompanyDetail company={company} />

            <div className="applications-section">
                <h2>Applications at {company.name}</h2>
                {applications.length > 0 ? (
                    <JobApplicationList applications={applications} />
                ) : (
                    <div className="empty-state">
                        <p>No applications found for this company.</p>
                        <Link to={`/job-applications/new?companyId=${id}`}>
                            <Button variant="primary">Create an Application</Button>
                        </Link>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Company"
            >
                <div className="delete-confirmation">
                    <p>Are you sure you want to delete this company? This will also delete all related job applications.</p>
                    <div className="modal-actions">
                        <Button type="button" variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="button" variant="danger" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CompanyDetailPage;