import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCompanies, searchCompaniesByName } from '../../api/companyApi';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Loader from '../ui/Loader';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            setIsLoading(true);
            const data = await getAllCompanies();
            setCompanies(data);
            setError(null);
        } catch (err) {
            setError('Failed to load companies');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            fetchCompanies();
            return;
        }

        try {
            setIsLoading(true);
            const data = await searchCompaniesByName(searchTerm);
            setCompanies(data);
            setError(null);
        } catch (err) {
            setError('Failed to search companies');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="companies-container">
            <div className="page-header">
                <h1>Companies</h1>
                <Link to="/companies/new">
                    <Button>Add Company</Button>
                </Link>
            </div>

            <Card className="search-card">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search companies by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <Button type="submit">Search</Button>
                </form>
            </Card>

            {error && <div className="error-message">{error}</div>}

            {companies.length === 0 ? (
                <div className="no-results">
                    <p>No companies found. {searchTerm ? 'Try a different search term or ' : ''}</p>
                    <Link to="/companies/new">
                        <Button variant="outline">Add a Company</Button>
                    </Link>
                </div>
            ) : (
                <div className="companies-grid">
                    {companies.map(company => (
                        <Card key={company.id} className="company-card">
                            <div className="company-logo-placeholder">
                                {company.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="company-info">
                                <h3>{company.name}</h3>
                                {company.website && (
                                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="company-website">
                                        {company.website.replace(/^https?:\/\/(www\.)?/, '')}
                                    </a>
                                )}
                                {company.industry && <p className="company-industry">{company.industry}</p>}
                            </div>
                            <Link to={`/companies/${company.id}`} className="company-details-link">
                                View Details
                            </Link>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompanyList;