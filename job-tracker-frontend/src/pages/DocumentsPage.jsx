import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUserDocuments, getAllUserDocumentsByType } from '../api/documentApi';
import DocumentList from '../components/documents/DocumentList';
import Button from '../components/ui/Button';
import Dropdown from '../components/ui/Dropdown';
import Loader from '../components/ui/Loader';

const DocumentsPage = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [typeFilter, setTypeFilter] = useState('ALL');

    const typeOptions = [
        { value: 'ALL', label: 'All Documents' },
        { value: 'RESUME', label: 'Resumes' },
        { value: 'COVER_LETTER', label: 'Cover Letters' },
        { value: 'OFFER_LETTER', label: 'Offer Letters' },
        { value: 'OTHER', label: 'Other Documents' },
    ];

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                let data;

                if (typeFilter === 'ALL') {
                    data = await getAllUserDocuments();
                } else {
                    data = await getAllUserDocumentsByType(typeFilter);
                }

                setDocuments(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load documents');
                setLoading(false);
                console.error(err);
            }
        };

        fetchDocuments();
    }, [typeFilter]);

    const handleTypeChange = (value) => {
        setTypeFilter(value);
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="documents-page">
            <div className="page-header">
                <h1>Documents</h1>
                <Link to="/documents/new">
                    <Button variant="primary">Upload Document</Button>
                </Link>
            </div>

            <div className="filter-section">
                <Dropdown
                    options={typeOptions}
                    value={typeFilter}
                    onChange={handleTypeChange}
                    label="Filter by type"
                />
            </div>

            {documents.length === 0 ? (
                <div className="empty-state">
                    <p>No documents found. Upload your resumes, cover letters, and other job-related documents.</p>
                    <Link to="/documents/new">
                        <Button variant="primary">Upload Your First Document</Button>
                    </Link>
                </div>
            ) : (
                <DocumentList documents={documents} />
            )}
        </div>
    );
};

export default DocumentsPage;