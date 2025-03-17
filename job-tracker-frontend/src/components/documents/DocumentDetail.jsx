import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getDocumentById, deleteDocument } from '../../api/documentApi';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Loader from '../ui/Loader';

const DocumentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [document, setDocument] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                setIsLoading(true);
                const documentData = await getDocumentById(id);
                setDocument(documentData);
                setError(null);
            } catch (err) {
                setError('Failed to load document details');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocument();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteDocument(id);
            navigate('/documents');
        } catch (err) {
            setError('Failed to delete document');
            console.error(err);
        }
    };

    const handleEdit = () => {
        navigate(`/documents/${id}/edit`);
    };

    const formatDocumentType = (type) => {
        return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    };

    const getFileExtension = (filename) => {
        return filename.split('.').pop().toUpperCase();
    };

    const getFileSize = (sizeInBytes) => {
        if (sizeInBytes < 1024) {
            return `${sizeInBytes} B`;
        } else if (sizeInBytes < 1024 * 1024) {
            return `${(sizeInBytes / 1024).toFixed(1)} KB`;
        } else {
            return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error || !document) {
        return <div className="error-message">{error || 'Document not found'}</div>;
    }

    return (
        <div className="document-detail-container">
            <div className="page-header">
                <div className="breadcrumbs">
                    <Link to="/documents">Documents</Link> / {document.name}
                </div>
                <div className="action-buttons">
                    <Button variant="outline" onClick={handleEdit}>Edit</Button>
                    <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
                </div>
            </div>

            <Card className="document-detail-card">
                <div className="document-header">
                    <div className="document-icon large">
                        <span className="file-extension">{getFileExtension(document.fileName)}</span>
                    </div>
                    <div className="document-title">
                        <h1>{document.name}</h1>
                        <div className="document-meta">
                            <span className="document-type">{formatDocumentType(document.documentType)}</span>
                            <span className="document-date">
                Uploaded on {new Date(document.uploadDate).toLocaleDateString()}
              </span>
                        </div>
                    </div>
                </div>

                <div className="document-info-grid">
                    <div className="info-item">
                        <span className="info-label">File Name</span>
                        <span>{document.fileName}</span>
                    </div>

                    <div className="info-item">
                        <span className="info-label">File Type</span>
                        <span>{getFileExtension(document.fileName)}</span>
                    </div>

                    {document.fileSize && (
                        <div className="info-item">
                            <span className="info-label">File Size</span>
                            <span>{getFileSize(document.fileSize)}</span>
                        </div>
                    )}

                    {document.jobApplication && (
                        <div className="info-item">
                            <span className="info-label">Job Application</span>
                            <Link to={`/job-applications/${document.jobApplication.id}`}>
                                {document.jobApplication.positionTitle} at {document.jobApplication.company.name}
                            </Link>
                        </div>
                    )}
                </div>

                {document.description && (
                    <div className="document-description">
                        <h3>Description</h3>
                        <p>{document.description}</p>
                    </div>
                )}

                <div className="document-actions">
                    <Button variant="primary">Download Document</Button>
                    {document.jobApplication ? (
                        <Link to={`/job-applications/${document.jobApplication.id}`}>
                            <Button variant="outline">View Job Application</Button>
                        </Link>
                    ) : (
                        <Button variant="outline">Attach to Job Application</Button>
                    )}
                </div>
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Document"
            >
                <p>Are you sure you want to delete "{document.name}"?</p>
                <p>This will permanently remove the document and cannot be undone.</p>
                <div className="modal-actions">
                    <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </div>
            </Modal>
        </div>
    );
};

export default DocumentDetail;