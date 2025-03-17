import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUserDocuments, getAllUserDocumentsByType } from '../../api/documentApi';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import Loader from '../ui/Loader';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState('ALL');

    const documentTypes = ['ALL', 'RESUME', 'COVER_LETTER', 'PORTFOLIO', 'OTHER'];

    useEffect(() => {
        fetchDocuments();
    }, [selectedType]);

    const fetchDocuments = async () => {
        try {
            setIsLoading(true);
            let data;

            if (selectedType === 'ALL') {
                data = await getAllUserDocuments();
            } else {
                data = await getAllUserDocumentsByType(selectedType);
            }

            setDocuments(data);
            setError(null);
        } catch (err) {
            setError('Failed to load documents');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDocumentType = (type) => {
        return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    };

    const getFileExtension = (filename) => {
        return filename.split('.').pop().toUpperCase();
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="documents-container">
            <div className="page-header">
                <h1>My Documents</h1>
                <Link to="/documents/upload">
                    <Button>Upload Document</Button>
                </Link>
            </div>

            <Card className="filter-card">
                <div className="filter-container">
                    <label htmlFor="document-type">Filter by type:</label>
                    <Dropdown
                        id="document-type"
                        value={selectedType}
                        options={documentTypes.map(type => ({
                            value: type,
                            label: type === 'ALL' ? 'All Documents' : formatDocumentType(type)
                        }))}
                        onChange={(value) => setSelectedType(value)}
                    />
                </div>
            </Card>

            {error && <div className="error-message">{error}</div>}

            {documents.length === 0 ? (
                <div className="no-documents">
                    <p>No documents found. {selectedType !== 'ALL' ? `Try a different document type or ` : ''}</p>
                    <Link to="/documents/upload">
                        <Button variant="outline">Upload a Document</Button>
                    </Link>
                </div>
            ) : (
                <div className="documents-grid">
                    {documents.map(document => (
                        <Card key={document.id} className="document-card">
                            <div className="document-icon">
                                <span className="file-extension">{getFileExtension(document.fileName)}</span>
                            </div>
                            <div className="document-info">
                                <h3>{document.name}</h3>
                                <div className="document-meta">
                                    <span className="document-type">{formatDocumentType(document.documentType)}</span>
                                    <span className="document-date">
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </span>
                                </div>
                                {document.description && (
                                    <p className="document-description">{document.description}</p>
                                )}
                            </div>
                            <div className="document-actions">
                                <Link to={`/documents/${document.id}`} className="view-document">
                                    View Details
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DocumentList;