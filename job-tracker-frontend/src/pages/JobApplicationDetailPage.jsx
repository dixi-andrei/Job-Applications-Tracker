import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getJobApplicationById, deleteJobApplication } from '../api/jobApplicationApi';
import { getInterviewsByJobApplication } from '../api/interviewApi';
import { getDocumentsByJobApplication } from '../api/documentApi';
import JobApplicationDetail from '../components/jobApplications/JobApplicationDetail';
import InterviewList from '../components/interviews/InterviewList';
import DocumentList from '../components/documents/DocumentList';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Loader from '../components/ui/Loader';
import Tab from '../components/ui/Tab';

const JobApplicationDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [interviews, setInterviews] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('details');

    useEffect(() => {
        const fetchApplicationData = async () => {
            try {
                setLoading(true);
                const [applicationData, interviewsData, documentsData] = await Promise.all([
                    getJobApplicationById(id),
                    getInterviewsByJobApplication(id),
                    getDocumentsByJobApplication(id),
                ]);

                setApplication(applicationData);
                setInterviews(interviewsData);
                setDocuments(documentsData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load application details');
                setLoading(false);
                console.error(err);
            }
        };

        fetchApplicationData();
    }, [id]);

    const handleStatusUpdate = (updatedApplication) => {
        setApplication(updatedApplication);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteJobApplication(id);
            navigate('/job-applications');
        } catch (err) {
            setError('Failed to delete application');
            console.error(err);
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;
    if (!application) return <div className="not-found">Application not found</div>;

    return (
        <div className="job-application-detail-page">
            <div className="page-header">
                <div className="header-title">
                    <h1>{application.positionTitle}</h1>
                    <span className="company-name">at {application.company.name}</span>
                </div>
                <div className="header-actions">
                    <Link to={`/job-applications/${id}/edit`}>
                        <Button variant="secondary">Edit</Button>
                    </Link>
                    <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
                        Delete
                    </Button>
                </div>
            </div>

            <div className="tabs">
                <Tab
                    tabs={[
                        { id: 'details', label: 'Details' },
                        { id: 'interviews', label: 'Interviews' },
                        { id: 'documents', label: 'Documents' },
                    ]}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            </div>

            <div className="tab-content">
                {activeTab === 'details' && (
                    <JobApplicationDetail
                        application={application}
                        onStatusUpdate={handleStatusUpdate}
                    />
                )}

                {activeTab === 'interviews' && (
                    <div className="interviews-section">
                        <div className="section-header">
                            <h2>Interviews</h2>
                            <Link to={`/interviews/new?applicationId=${id}`}>
                                <Button variant="primary">Schedule Interview</Button>
                            </Link>
                        </div>
                        <InterviewList interviews={interviews} />
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="documents-section">
                        <div className="section-header">
                            <h2>Documents</h2>
                            <Link to={`/documents/new?applicationId=${id}`}>
                                <Button variant="primary">Upload Document</Button>
                            </Link>
                        </div>
                        <DocumentList documents={documents} />
                    </div>
                )}
            </div>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Job Application"
            >
                <div className="delete-confirmation">
                    <p>Are you sure you want to delete this job application? This action cannot be undone.</p>
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

export default JobApplicationDetailPage;