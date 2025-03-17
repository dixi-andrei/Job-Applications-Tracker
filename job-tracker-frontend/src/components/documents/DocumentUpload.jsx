import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadDocument } from '../../api/documentApi';
import Button from '../ui/Button';
import Loader from '../ui/Loader';

const DocumentUpload = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        documentType: 'RESUME',
        description: '',
        jobApplicationId: ''  // Optional, can be null
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);

            // Create a preview for PDFs and images
            if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    setPreview(fileReader.result);
                };
                fileReader.readAsDataURL(file);
            } else {
                setPreview(null);
            }

            // Set name from filename if not already set
            if (!formData.name) {
                setFormData(prev => ({
                    ...prev,
                    name: file.name.split('.')[0] // Remove extension
                }));
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setError('Please select a file to upload');
            return;
        }

        try {
            setLoading(true);
            const formDataObj = new FormData();
            formDataObj.append('file', selectedFile);
            formDataObj.append('name', formData.name);
            formDataObj.append('documentType', formData.documentType);
            formDataObj.append('description', formData.description);
            if (formData.jobApplicationId) {
                formDataObj.append('jobApplicationId', formData.jobApplicationId);
            }

            const uploadedDocument = await uploadDocument(formDataObj);
            navigate(`/documents/${uploadedDocument.id}`);
        } catch (err) {
            setError('Failed to upload document');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="document-upload-container">
            <h2>Upload New Document</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="upload-form">
                <div className="file-upload-area">
                    <label htmlFor="fileUpload" className="file-upload-label">
                        {selectedFile ? selectedFile.name : 'Choose a file'}
                        <input
                            type="file"
                            id="fileUpload"
                            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                    </label>

                    {preview && (
                        <div className="file-preview">
                            {selectedFile.type === 'application/pdf' ? (
                                <iframe src={preview} title="PDF Preview" className="pdf-preview" />
                            ) : (
                                <img src={preview} alt="Document Preview" className="image-preview" />
                            )}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Document Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="documentType">Document Type</label>
                    <select
                        id="documentType"
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="RESUME">Resume</option>
                        <option value="COVER_LETTER">Cover Letter</option>
                        <option value="PORTFOLIO">Portfolio</option>
                        <option value="CERTIFICATE">Certificate</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description (Optional)</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="jobApplicationId">Link to Job Application (Optional)</label>
                    <input
                        type="text"
                        id="jobApplicationId"
                        name="jobApplicationId"
                        value={formData.jobApplicationId}
                        onChange={handleInputChange}
                        placeholder="Enter Job Application ID"
                    />
                </div>

                <div className="form-actions">
                    <Button type="submit" disabled={!selectedFile}>Upload Document</Button>
                    <Button type="button" onClick={() => navigate('/documents')} variant="secondary">
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default DocumentUpload;