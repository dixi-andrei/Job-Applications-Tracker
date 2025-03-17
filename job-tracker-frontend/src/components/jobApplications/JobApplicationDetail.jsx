import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getJobApplicationById, updateJobApplicationStatus, deleteJobApplication } from '../../api/jobApplicationApi';
import { getInterviewsByJobApplication } from '../../api/interviewApi';
import { getDocumentsByJobApplication } from '../../api/documentApi';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Loader from '../ui/Loader';
import { APPLICATION_STATUSES } from '../utils/constants';
import { formatDate } from '../utils/formatters';

const JobApplicationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jobApplication, setJobApplication] = useState(null);
    const [interviews, setInterviews] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        fetchJobApplicationData();
    }, [id]);

    const fetchJobApplicationData = async () => {
        setLoading(true);
        try {
            const jobAppData = await getJobApplicationById(parseInt(id));
            setJobApplication(jobAppData);
            setNewStatus(jobAppData.status);

            // Fetch related data
            const interviewsData = await getInterviewsByJobApplication(parseInt(id));
            setInterviews(interviewsData);

            const documentsData = await getDocumentsByJobApplication(parseInt(id));
            setDocuments(documentsData);
        } catch (err) {
            setError('Failed to load job application details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async () => {
        try {
            const updatedJobApp = await updateJobApplicationStatus(parseInt(id), newStatus);
            setJobApplication(updatedJobApp);
            setShowStatusModal(false);
        } catch (err) {
            setError('Failed to update status');
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteJobApplication(parseInt(id));
            navigate('/job-applications');
        } catch (err) {
            setError('Failed to delete job application');
            console.error(err);
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;
    if (!jobApplication) return <div>Job application not found</div>;

    return (
        <div className="job-application-detail">
            <div className="detail-header">
                <h1>{jobApplication.positionTitle}</h1>
                <div className="company-info">
                    <h2>
                        {jobApplication.companyId ? (
                            <Link to={`/companies/${jobApplication.companyId}`}>{jobApplication.companyName}</Link>
                        ) : (
                            jobApplication.companyName
                        )}
                    </h2>
                    {jobApplication.location && <span className="location">{jobApplication.location}</span>}
                </div>

                <div className="status-badge" onClick={() => setShowStatusModal(true)}>
          <span className={`status status-${jobApplication.status.toLowerCase()}`}>
            {jobApplication.status.replace('_', ' ')}
          </span>
                    <span className="edit-icon">✏️</span>
                </div>
            </div>

            <div className="detail-content">
                <div className="detail-section">
                    <h3>Details</h3>
                    <Card>
                        <div className="detail-item">
                            <span className="label">Applied on:</span>
                            <span className="value">{formatDate(jobApplication.applicationDate)}</span>
                        </div>

                        {jobApplication.salary && (
                            <div className="detail-item">
                                <span className="label">Salary:</span>
                                <span className="value">{jobApplication.salary}</span>
                            </div>
                        )}

                        {jobApplication.applicationLink && (
                            <div className="detail-item">
                                <span className="label">Application Link:</span>
                                <a href={jobApplication.applicationLink} target="_blank" rel="noopener noreferrer" className="value link">
                                    View Original Posting
                                </a>
                            </div>
                        )}

                        {jobApplication.notes && (
                            <div className="detail-item column">
                                <span className="label">Notes:</span>
                                <div className="value notes">{jobApplication.notes}</div>
                            </div>
                        )}
                    </Card>
                </div>

                {jobApplication.jobDescription && (
                    <div className="detail-section">
                        <h3>Job Description</h3>
                        <Card>
                            <div className="job-description">
                                {jobApplication.jobDescription}
                            </div>
                        </Card>
                    </div>
                )}

                <div className="detail-section">
                    <div className="section-header">
                        <h3>Interviews ({interviews.length})</h3>
                        <Button
                            as={Link}
                            to={`/interviews/new?jobApplicationId=${id}`}
                            size="small"
                        >
                            Schedule Interview
                        </Button>
                    </div>

                    {interviews.length === 0 ? (
                        <Card className="empty-state">
                            <p>No interviews scheduled yet</p>
                        </Card>
                    ) : (
                        <div className="interviews-grid">
                            {interviews.map(interview => (
                                <Card key={interview.id} className="interview-card">
                                    <div className="interview-date">
                                        {formatDate(interview.dateTime)}
                                    </div>
                                    <div className="interview-time">
                                        {new Date(interview.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <h4>{interview.title}</h4>
                                    {interview.location && <div className="interview-location">{interview.location}</div>}
                                    <div className="card-actions">
                                        <Link to={`/interviews/${interview.id}`}>View Details</Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <div className="detail-section">
                    <div className="section-header">
                        <h3>Documents ({documents.length})</h3>
                        <Button
                            as={Link}
                            to={`/documents/upload?jobApplicationId=${id}`}
                            size="small"
                        >
                            Upload Document
                        </Button>
                    </div>

                    {documents.length === 0 ? (
                        <Card className="empty-state">
                            <p>No documents uploaded yet</p>
                        </Card>
                    ) : (
                        <div className="documents-grid">
                            {documents.map(document => (
                                <Card key={document.id} className="document-card">
                                    <div className="document-type">{document.documentType}</div>
                                    <h4>{document.name}</h4>
                                    <div className="upload-date">
                                        Uploaded on {formatDate(document.uploadDate)}
                                    </div>
                                    <div className="card-actions">
                                        <Link to={`/documents/${document.id}`}>View Document</Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="detail-actions">
                <Button
                    as={Link}
                    to={`/job-applications/${id}/edit`}
                    variant="secondary"
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    onClick={() => setShowDeleteModal(true)}
                >
                    Delete
                </Button>
            </div>

            {/* Status Update Modal */}
            {showStatusModal && (
                <Modal
                    title="Update Application Status"
                    onClose={() => setShowStatusModal(false)}
                    footer={
                        <>
                            <Button variant="secondary" onClick={() => setShowStatusModal(false)}>Cancel</Button>
                            <Button onClick={handleStatusUpdate}>Update Status</Button>
                        </>
                    }
                >
                    <div className="status-select">
                        <label htmlFor="status">Select new status:</label>
                        <select
                            id="status"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                        >
                            {APPLICATION_STATUSES.map(status => (
                                <option key={status} value={status}>
                                    {status.replace('_', ' ')}
                                </option>
                            ))}
                        </select>
                    </div>
                </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <Modal
                    title="Confirm Deletion"
                    onClose={() => setShowDeleteModal(false)}
                    footer={
                        <>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                            <Button variant="danger" onClick={handleDelete}>Delete Application</Button>
                        </>
                    }
                >
                    <p>Are you sure you want to delete this job application? This action cannot be undone.</p>
                </Modal>
            )}
        </div>
    );
};

export default JobApplicationDetail;