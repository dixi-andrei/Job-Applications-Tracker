import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createCompany, getCompanyById, updateCompany } from '../../api/companyApi';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useForm } from '../../hooks/useForm';
import Loader from '../ui/Loader';

const CompanyForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    const [isLoading, setIsLoading] = useState(isEditing);
    const [error, setError] = useState(null);

    const { values, handleChange, setValues } = useForm({
        name: '',
        industry: '',
        website: '',
        location: '',
        contactEmail: '',
        contactPhone: '',
        notes: ''
    });

    useEffect(() => {
        const fetchCompany = async () => {
            if (!isEditing) return;

            try {
                setIsLoading(true);
                const companyData = await getCompanyById(id);
                setValues({
                    name: companyData.name || '',
                    industry: companyData.industry || '',
                    website: companyData.website || '',
                    location: companyData.location || '',
                    contactEmail: companyData.contactEmail || '',
                    contactPhone: companyData.contactPhone || '',
                    notes: companyData.notes || ''
                });
                setError(null);
            } catch (err) {
                setError('Failed to load company data');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompany();
    }, [id, isEditing, setValues]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing) {
                await updateCompany(id, values);
            } else {
                await createCompany(values);
            }
            navigate('/companies');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save company');
            setIsLoading(false);
        }
    };

    if (isLoading && isEditing) {
        return <Loader />;
    }

    return (
        <div className="company-form-container">
            <div className="page-header">
                <h1>{isEditing ? 'Edit Company' : 'Add Company'}</h1>
            </div>

            <Card className="form-card">
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Company Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="industry">Industry</label>
                        <input
                            type="text"
                            id="industry"
                            name="industry"
                            value={values.industry}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <input
                            type="url"
                            id="website"
                            name="website"
                            value={values.website}
                            onChange={handleChange}
                            placeholder="https://"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={values.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="contactEmail">Contact Email</label>
                            <input
                                type="email"
                                id="contactEmail"
                                name="contactEmail"
                                value={values.contactEmail}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contactPhone">Contact Phone</label>
                            <input
                                type="tel"
                                id="contactPhone"
                                name="contactPhone"
                                value={values.contactPhone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={values.notes}
                            onChange={handleChange}
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="form-actions">
                        <Link to={isEditing ? `/companies/${id}` : '/companies'}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Company'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CompanyForm;